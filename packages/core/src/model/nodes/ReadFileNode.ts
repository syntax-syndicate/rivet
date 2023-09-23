import { type ChartNode, type NodeId, type PortId } from '../NodeBase.js';
import { type NodeInputDefinition, type NodeOutputDefinition } from '../NodeBase.js';
import { type DataValue } from '../DataValue.js';
import { NodeImpl, type NodeUIData } from '../NodeImpl.js';
import { nodeDefinition } from '../NodeDefinition.js';
import { nanoid } from 'nanoid/non-secure';
import { expectType } from '../../utils/index.js';
import { type InternalProcessContext } from '../ProcessContext.js';
import { dedent } from 'ts-dedent';

export type ReadFileNode = ChartNode<'readFile', ReadFileNodeData>;

type ReadFileNodeData = {
  path: string;
  usePathInput: boolean;

  errorOnMissingFile?: boolean;
};

export class ReadFileNodeImpl extends NodeImpl<ReadFileNode> {
  static create(): ReadFileNode {
    return {
      id: nanoid() as NodeId,
      type: 'readFile',
      title: 'Read File',
      visualData: { x: 0, y: 0, width: 250 },
      data: {
        path: '',
        usePathInput: true,
        errorOnMissingFile: false,
      },
    };
  }

  getInputDefinitions(): NodeInputDefinition[] {
    const inputDefinitions: NodeInputDefinition[] = [];

    if (this.chartNode.data.usePathInput) {
      inputDefinitions.push({
        id: 'path' as PortId,
        title: 'Path',
        dataType: 'string',
      });
    }

    return inputDefinitions;
  }

  getOutputDefinitions(): NodeOutputDefinition[] {
    return [
      {
        id: 'content' as PortId,
        title: 'Content',
        dataType: 'string',
      },
    ];
  }

  static getUIData(): NodeUIData {
    return {
      infoBoxBody: dedent`
        Reads the contents of the specified file and outputs it as a string.
      `,
      infoBoxTitle: 'Read File Node',
      contextMenuTitle: 'Read File',
      group: ['Input/Output'],
    };
  }

  async process(
    inputData: Record<PortId, DataValue>,
    context: InternalProcessContext,
  ): Promise<Record<PortId, DataValue>> {
    const { nativeApi } = context;

    if (nativeApi == null) {
      throw new Error('This node requires a native API to run.');
    }

    const path = this.chartNode.data.usePathInput
      ? expectType(inputData['path' as PortId], 'string')
      : this.chartNode.data.path;

    try {
      const content = await nativeApi.readTextFile(path, undefined);
      return {
        ['content' as PortId]: { type: 'string', value: content },
      };
    } catch (err) {
      if (this.chartNode.data.errorOnMissingFile) {
        throw err;
      } else {
        return {
          ['content' as PortId]: { type: 'string', value: '(file does not exist)' },
        };
      }
    }
  }
}

export const readFileNode = nodeDefinition(ReadFileNodeImpl, 'Read File');
