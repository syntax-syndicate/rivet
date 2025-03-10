import {
  type ChartNode,
  type ChatMessage,
  type EditorDefinition,
  type Inputs,
  type InternalProcessContext,
  type NodeId,
  type NodeInputDefinition,
  type NodeOutputDefinition,
  type NodeUIData,
  type Outputs,
  type PluginNodeImpl,
  type PortId,
  type ScalarDataValue,
} from '../../../index.js';
import {
  streamChatCompletions,
  streamGenerativeAi,
  type GenerativeAiGoogleModel,
  generativeAiGoogleModels,
  type StreamGenerativeAiOptions,
  type ChatCompletionChunk,
  type GoogleModelsDeprecated,
  generativeAiOptions,
} from '../google.js';
import { nanoid } from 'nanoid/non-secure';
import { dedent } from 'ts-dedent';
import retry from 'p-retry';
import { match } from 'ts-pattern';
import { coerceType, coerceTypeOptional } from '../../../utils/coerceType.js';
import { addWarning } from '../../../utils/outputs.js';
import { getError } from '../../../utils/errors.js';
import { uint8ArrayToBase64 } from '../../../utils/base64.js';
import { pluginNodeDefinition } from '../../../model/NodeDefinition.js';
import { getScalarTypeOf, isArrayDataValue } from '../../../model/DataValue.js';
import type { TokenizerCallInfo } from '../../../integrations/Tokenizer.js';
import { getInputOrData } from '../../../utils/inputs.js';
import {
  GoogleGenerativeAIError,
  type GoogleGenerativeAIFetchError,
  SchemaType,
  type Content,
  type FunctionDeclaration,
  type FunctionDeclarationSchema,
  type FunctionDeclarationsTool,
  type Part,
  type Tool,
  type FunctionCall,
} from '@google/generative-ai';

export type ChatGoogleNode = ChartNode<'chatGoogle', ChatGoogleNodeData>;

export type ChatGoogleNodeConfigData = {
  model: GenerativeAiGoogleModel;
  temperature: number;
  useTopP: boolean;
  top_p?: number;
  top_k?: number;
  maxTokens: number;
};

export type ChatGoogleNodeData = ChatGoogleNodeConfigData & {
  useModelInput: boolean;
  useTemperatureInput: boolean;
  useTopPInput: boolean;
  useTopKInput: boolean;
  useUseTopPInput: boolean;
  useMaxTokensInput: boolean;
  useToolCalling: boolean;

  /** Given the same set of inputs, return the same output without hitting GPT */
  cache: boolean;

  useAsGraphPartialOutput?: boolean;
};

// Temporary
const cache = new Map<string, Outputs>();

export const ChatGoogleNodeImpl: PluginNodeImpl<ChatGoogleNode> = {
  create(): ChatGoogleNode {
    const chartNode: ChatGoogleNode = {
      type: 'chatGoogle',
      title: 'Chat (Google)',
      id: nanoid() as NodeId,
      visualData: {
        x: 0,
        y: 0,
        width: 275,
      },
      data: {
        model: 'gemini-2.0-flash-001',
        useModelInput: false,

        temperature: 0.5,
        useTemperatureInput: false,

        top_p: 1,
        useTopPInput: false,

        top_k: undefined,
        useTopKInput: false,

        useTopP: false,
        useUseTopPInput: false,

        maxTokens: 1024,
        useMaxTokensInput: false,

        cache: false,
        useAsGraphPartialOutput: true,

        useToolCalling: false,
      },
    };

    return chartNode;
  },

  getInputDefinitions(data): NodeInputDefinition[] {
    const inputs: NodeInputDefinition[] = [];

    inputs.push({
      id: 'systemPrompt' as PortId,
      title: 'System Prompt',
      dataType: 'string',
      required: false,
      description: 'An optional system prompt for the model to use.',
    });

    if (data.useModelInput) {
      inputs.push({
        id: 'model' as PortId,
        title: 'Model',
        dataType: 'string',
        required: false,
      });
    }

    if (data.useTemperatureInput) {
      inputs.push({
        dataType: 'number',
        id: 'temperature' as PortId,
        title: 'Temperature',
      });
    }

    if (data.useTopPInput) {
      inputs.push({
        dataType: 'number',
        id: 'top_p' as PortId,
        title: 'Top P',
      });
    }

    if (data.useUseTopPInput) {
      inputs.push({
        dataType: 'boolean',
        id: 'useTopP' as PortId,
        title: 'Use Top P',
      });
    }

    if (data.useMaxTokensInput) {
      inputs.push({
        dataType: 'number',
        id: 'maxTokens' as PortId,
        title: 'Max Tokens',
      });
    }

    if (data.useToolCalling) {
      inputs.push({
        dataType: 'gpt-function[]',
        id: 'functions' as PortId,
        title: 'Tools',
        description: 'Tools available for the model to call.',
      });
    }

    inputs.push({
      dataType: ['chat-message', 'chat-message[]'] as const,
      id: 'prompt' as PortId,
      title: 'Prompt',
    });

    return inputs;
  },

  getOutputDefinitions(data): NodeOutputDefinition[] {
    const outputs: NodeOutputDefinition[] = [];

    outputs.push({
      dataType: 'string',
      id: 'response' as PortId,
      title: 'Response',
    });

    outputs.push({
      dataType: 'chat-message[]',
      id: 'in-messages' as PortId,
      title: 'Messages Sent',
      description: 'All messages sent to the model.',
    });

    outputs.push({
      dataType: 'chat-message[]',
      id: 'all-messages' as PortId,
      title: 'All Messages',
      description: 'All messages, with the response appended.',
    });

    if (data.useToolCalling) {
      outputs.push({
        dataType: 'object[]',
        id: 'function-calls' as PortId,
        title: 'Tool Calls',
        description: 'Tool calls made by the model.',
      });
    }

    return outputs;
  },

  getBody(data): string {
    return dedent`
      ${generativeAiGoogleModels[data.model]?.displayName ?? `Google (${data.model})`}
      ${
        data.useTopP
          ? `Top P: ${data.useTopPInput ? '(Using Input)' : data.top_p}`
          : `Temperature: ${data.useTemperatureInput ? '(Using Input)' : data.temperature}`
      }
      Max Tokens: ${data.maxTokens}
    `;
  },

  getEditors(): EditorDefinition<ChatGoogleNode>[] {
    return [
      {
        type: 'dropdown',
        label: 'Model',
        dataKey: 'model',
        useInputToggleDataKey: 'useModelInput',
        options: generativeAiOptions,
      },
      {
        type: 'number',
        label: 'Temperature',
        dataKey: 'temperature',
        useInputToggleDataKey: 'useTemperatureInput',
        min: 0,
        max: 2,
        step: 0.1,
      },
      {
        type: 'number',
        label: 'Top P',
        dataKey: 'top_p',
        useInputToggleDataKey: 'useTopPInput',
        min: 0,
        max: 1,
        step: 0.1,
      },
      {
        type: 'toggle',
        label: 'Use Top P',
        dataKey: 'useTopP',
        useInputToggleDataKey: 'useUseTopPInput',
      },
      {
        type: 'number',
        label: 'Max Tokens',
        dataKey: 'maxTokens',
        useInputToggleDataKey: 'useMaxTokensInput',
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        step: 1,
      },
      {
        type: 'toggle',
        label: 'Enable Tool Calling',
        dataKey: 'useToolCalling',
      },
      {
        type: 'toggle',
        label: 'Cache (same inputs, same outputs)',
        dataKey: 'cache',
      },
      {
        type: 'toggle',
        label: 'Use for subgraph partial output',
        dataKey: 'useAsGraphPartialOutput',
      },
    ];
  },

  getUIData(): NodeUIData {
    return {
      infoBoxBody: dedent`
        Makes a call to an Google chat model. The settings contains many options for tweaking the model's behavior.
      `,
      infoBoxTitle: 'Chat (Google) Node',
      contextMenuTitle: 'Chat (Google)',
      group: ['AI'],
    };
  },

  async process(data, inputs: Inputs, context: InternalProcessContext): Promise<Outputs> {
    const output: Outputs = {};

    const systemPrompt = coerceTypeOptional(inputs['systemPrompt' as PortId], 'string');

    const rawModel = getInputOrData(data, inputs, 'model');
    const model = rawModel as GenerativeAiGoogleModel;

    const temperature = getInputOrData(data, inputs, 'temperature', 'number');
    const topP = getInputOrData(data, inputs, 'top_p', 'number');
    const useTopP = getInputOrData(data, inputs, 'useTopP', 'boolean');

    const { messages } = getChatGoogleNodeMessages(inputs);

    const prompt = await Promise.all(
      messages.map(async (message): Promise<Content> => {
        if (message.type === 'user' || message.type === 'assistant') {
          const parts = await Promise.all(
            [message.message].flat().map(async (part): Promise<Part> => {
              if (typeof part === 'string') {
                return { text: part };
              } else if (part.type === 'image') {
                return {
                  inlineData: {
                    mimeType: part.mediaType,
                    data: (await uint8ArrayToBase64(part.data))!,
                  },
                };
              } else {
                throw new Error(`Google Vertex AI does not support message parts of type ${part.type}`);
              }
            }),
          );

          if (message.type === 'assistant' && (message.function_calls?.length ?? 0) > 0) {
            if (parts[0]!.text === '') {
              parts.shift(); // remove empty text part
            }

            for (const call of message.function_calls ?? []) {
              parts.push({
                functionCall: {
                  name: call.name,
                  args: JSON.parse(call.arguments),
                },
              });
            }
          }

          return {
            role: message.type,
            parts,
          };
        }

        if (message.type === 'function') {
          return {
            role: 'function',
            parts: [
              {
                functionResponse: {
                  name: message.name,
                  response: {
                    result: typeof message.message === 'string' ? message.message : '',
                  },
                },
              },
            ],
          };
        }

        throw new Error(`Google Vertex AI does not support message type ${message.type}`);
      }),
    );

    let { maxTokens } = data;

    const tokenizerInfo: TokenizerCallInfo = {
      node: context.node,
      model,
      endpoint: undefined,
    };

    // TODO Better token counting for Google models.
    const tokenCount = await context.tokenizer.getTokenCountForMessages(messages, undefined, tokenizerInfo);

    if (generativeAiGoogleModels[model] && tokenCount >= generativeAiGoogleModels[model].maxTokens) {
      throw new Error(
        `The model ${model} can only handle ${generativeAiGoogleModels[model].maxTokens} tokens, but ${tokenCount} were provided in the prompts alone.`,
      );
    }

    if (generativeAiGoogleModels[model] && tokenCount + maxTokens > generativeAiGoogleModels[model].maxTokens) {
      const message = `The model can only handle a maximum of ${
        generativeAiGoogleModels[model].maxTokens
      } tokens, but the prompts and max tokens together exceed this limit. The max tokens has been reduced to ${
        generativeAiGoogleModels[model].maxTokens - tokenCount
      }.`;
      addWarning(output, message);
      maxTokens = Math.floor((generativeAiGoogleModels[model].maxTokens - tokenCount) * 0.95); // reduce max tokens by 5% to be safe, calculation is a little wrong.
    }

    const project = context.getPluginConfig('googleProjectId');
    const location = context.getPluginConfig('googleRegion');
    const applicationCredentials = context.getPluginConfig('googleApplicationCredentials');
    const apiKey = context.getPluginConfig('googleApiKey');

    let tools: Tool[] = [];

    if (data.useToolCalling) {
      const gptTools = coerceTypeOptional(inputs['functions' as PortId], 'gpt-function[]') ?? [];

      if (gptTools) {
        tools = [
          {
            functionDeclarations: gptTools.map(
              (tool): FunctionDeclaration => ({
                name: tool.name,
                description: tool.description,
                parameters:
                  Object.keys((tool.parameters as any).properties).length === 0
                    ? undefined
                    : {
                        type: SchemaType.OBJECT,
                        properties: (tool.parameters as any).properties,
                        required: (tool.parameters as any).required || [],
                      },
              }),
            ),
          },
        ];
      }
    }

    if (!apiKey) {
      if (project == null) {
        throw new Error('Google Project ID or Google API Key is not defined.');
      }
      if (location == null) {
        throw new Error('Google Region or Google API Key is not defined.');
      }
      if (applicationCredentials == null) {
        throw new Error('Google Application Credentials or Google API Key is not defined.');
      }
    }

    try {
      return await retry(
        async () => {
          const options: Omit<StreamGenerativeAiOptions, 'apiKey' | 'signal'> = {
            prompt,
            model,
            temperature: useTopP ? undefined : temperature,
            topP: useTopP ? topP : undefined,
            maxOutputTokens: maxTokens,
            systemPrompt,
            topK: undefined,
            tools,
          };
          const cacheKey = JSON.stringify(options);

          if (data.cache) {
            const cached = cache.get(cacheKey);
            if (cached) {
              return cached;
            }
          }

          const startTime = Date.now();

          let chunks: AsyncGenerator<ChatCompletionChunk>;

          if (data.useToolCalling && !apiKey) {
            throw new Error('Tool calling is only supported when using a generative API key.');
          }

          if (apiKey) {
            chunks = streamGenerativeAi({
              signal: context.signal,
              model,
              prompt,
              maxOutputTokens: maxTokens,
              temperature: useTopP ? undefined : temperature,
              topP: useTopP ? topP : undefined,
              topK: undefined,
              apiKey,
              systemPrompt,
              tools,
            });
          } else {
            chunks = streamChatCompletions({
              signal: context.signal,
              model: model as GoogleModelsDeprecated,
              prompt,
              max_output_tokens: maxTokens,
              temperature: useTopP ? undefined : temperature,
              top_p: useTopP ? topP : undefined,
              top_k: undefined,
              project: project!,
              location: location!,
              applicationCredentials: applicationCredentials!,
            });
          }

          const responseParts: string[] = [];
          const functionCalls: FunctionCall[] = [];

          for await (const chunk of chunks) {
            if (chunk.completion) {
              responseParts.push(chunk.completion);

              output['response' as PortId] = {
                type: 'string',
                value: responseParts.join('').trim(),
              };
            }

            if (chunk.function_calls) {
              functionCalls.push(...chunk.function_calls);

              output['function-calls' as PortId] = {
                type: 'object[]',
                value: chunk.function_calls as unknown as Record<string, unknown>[],
              };
            }

            context.onPartialOutputs?.(output);
          }

          const endTime = Date.now();

          output['all-messages' as PortId] = {
            type: 'chat-message[]',
            value: [
              ...messages,
              {
                type: 'assistant',
                message: responseParts.join('').trim() ?? '',
                function_call: undefined,
                function_calls:
                  functionCalls.length === 0
                    ? undefined
                    : functionCalls.map((fc) => ({
                        id: fc.name,
                        name: fc.name,
                        arguments: JSON.stringify(fc.args),
                      })),
              },
            ],
          };

          output['in-messages' as PortId] = {
            type: 'chat-message[]',
            value: messages,
          };

          if (responseParts.length === 0 && functionCalls.length === 0) {
            throw new Error('No response from Google');
          }

          output['requestTokens' as PortId] = { type: 'number', value: tokenCount };

          const responseTokenCount = await context.tokenizer.getTokenCountForString(
            responseParts.join(''),
            tokenizerInfo,
          );
          output['responseTokens' as PortId] = { type: 'number', value: responseTokenCount };

          // TODO
          // const cost =
          //   getCostForPrompt(completionMessages, model) + getCostForTokens(responseTokenCount, 'completion', model);

          // output['cost' as PortId] = { type: 'number', value: cost };

          const duration = endTime - startTime;

          output['duration' as PortId] = { type: 'number', value: duration };

          Object.freeze(output);
          cache.set(cacheKey, output);

          return output;
        },
        {
          retries: 10,
          maxRetryTime: 1000 * 60 * 5,
          factor: 2.5,
          minTimeout: 500,
          maxTimeout: 5000,
          randomize: true,
          signal: context.signal,
          onFailedAttempt(err) {
            context.trace(`ChatGoogleNode failed, retrying: ${err.toString()}`);

            const googleError = err as GoogleGenerativeAIFetchError;

            if (googleError.status && googleError.status >= 400 && googleError.status < 500) {
              if (googleError.status === 429) {
                context.trace('Google API rate limit exceeded, retrying...');
              } else {
                throw new Error(`Google API error: ${googleError.status} ${googleError.message}`);
              }
            }

            if (context.signal.aborted) {
              throw new Error('Aborted');
            }
          },
        },
      );
    } catch (error) {
      context.trace(getError(error).stack ?? 'Missing stack');
      throw new Error(`Error processing ChatGoogleNode: ${(error as Error).message}`);
    }
  },
};

export const chatGoogleNode = pluginNodeDefinition(ChatGoogleNodeImpl, 'Chat');

export function getChatGoogleNodeMessages(inputs: Inputs) {
  const prompt = inputs['prompt' as PortId];
  if (!prompt) {
    throw new Error('Prompt is required');
  }

  const messages: ChatMessage[] = match(prompt)
    .with({ type: 'chat-message' }, (p) => [p.value])
    .with({ type: 'chat-message[]' }, (p) => p.value)
    .with({ type: 'string' }, (p): ChatMessage[] => [{ type: 'user', message: p.value }])
    .with({ type: 'string[]' }, (p): ChatMessage[] => p.value.map((v) => ({ type: 'user', message: v })))
    .otherwise((p): ChatMessage[] => {
      if (isArrayDataValue(p)) {
        const stringValues = (p.value as readonly unknown[]).map((v) =>
          coerceType(
            {
              type: getScalarTypeOf(p.type),
              value: v,
            } as ScalarDataValue,
            'string',
          ),
        );

        return stringValues.filter((v) => v != null).map((v) => ({ type: 'user', message: v }));
      }

      const coercedMessage = coerceType(p, 'chat-message');
      if (coercedMessage != null) {
        return [coercedMessage];
      }

      const coercedString = coerceType(p, 'string');
      return coercedString != null ? [{ type: 'user', message: coerceType(p, 'string') }] : [];
    });
  return { messages };
}
