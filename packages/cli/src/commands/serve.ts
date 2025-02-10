import { Hono, type Context } from 'hono';
import { serve as serveHono } from '@hono/node-server';
import type * as yargs from 'yargs';
import { readdir, stat } from 'node:fs/promises';
import { extname, isAbsolute, join } from 'node:path';
import didYouMean from 'didyoumean2';
import {
  createProcessor,
  loadProjectFromFile,
  type GraphId,
  type Outputs,
  type Inputs,
  type Project,
  type LooseDataValue,
} from '@ironclad/rivet-node';
import chalk from 'chalk';
import { configDotenv } from 'dotenv';

export function makeCommand<T>(y: yargs.Argv<T>) {
  return y
    .option('port', {
      describe: 'The port to serve on',
      type: 'number',
      default: 3000,
    })
    .option('dev', {
      describe: 'Run in development mode: rereads the project file on each request',
      type: 'boolean',
      default: false,
    })
    .option('graph', {
      describe: 'The ID or name of the graph to run. If omitted, the main graph is used.',
      type: 'string',
      demandOption: false,
    })
    .option('allow-specifying-graph-id', {
      describe: 'Allow specifying the graph ID in the URL path',
      type: 'boolean',
      default: false,
    })
    .option('openai-api-key', {
      describe:
        'The OpenAI API key to use for the project. If omitted, the environment variable OPENAI_API_KEY is used.',
      type: 'string',
      demandOption: false,
    })
    .option('openai-endpoint', {
      describe:
        'The OpenAI API endpoint to use for the project. If omitted, the environment variable OPENAI_ENDPOINT is used.',
      type: 'string',
      demandOption: false,
    })
    .option('openai-organization', {
      describe:
        'The OpenAI organization to use for the project. If omitted, the environment variable OPENAI_ORGANIZATION is used.',
      type: 'string',
      demandOption: false,
    })
    .option('expose-cost', {
      describe: 'Expose the cost of the graph run in the response',
      type: 'boolean',
      default: false,
    })
    .positional('projectFile', {
      describe:
        'The project file to serve. If omitted, the project file in the current directory is used. There cannot be multiple project files in the current directory.',
      type: 'string',
      demandOption: false,
    });
}

export async function serve(args: {
  port: number;
  projectFile: string | undefined;
  dev: boolean;
  graph: string | undefined;
  allowSpecifyingGraphId: boolean;
  openaiApiKey: string | undefined;
  openaiEndpoint: string | undefined;
  openaiOrganization: string | undefined;
  exposeCost: boolean;
}) {
  try {
    configDotenv();

    const app = new Hono();

    const projectFilePath = await getProjectFile(args.projectFile);
    const initialProject = await loadProjectFromFile(projectFilePath);

    throwIfNoMainGraph(initialProject, args.graph, projectFilePath);
    throwIfInvalidGraph(initialProject, args.graph, projectFilePath);

    app.post('/', async (c) => {
      const project = args.dev ? await loadProjectFromFile(projectFilePath) : initialProject;

      const text = await c.req.text();
      let inputs: Record<string, LooseDataValue> = {};
      if (text.trim()) {
        inputs = JSON.parse(text);

        if (typeof inputs !== 'object') {
          throw new Error('Inputs must be an object');
        }
      }

      const outputs = await runGraph({ project, inputs, graphId: args.graph as GraphId, ...args });

      return c.json(outputs);
    });

    if (args.allowSpecifyingGraphId) {
      app.post('/:graphId', async (c) => {
        const project = args.dev ? await loadProjectFromFile(projectFilePath) : initialProject;
        const inputs = await c.req.json();
        const graphId = c.req.param('graphId') as GraphId;

        const outputs = await runGraph({ project, inputs, graphId, ...args });

        return c.json(outputs);
      });
    }

    const server = serveHono({
      port: args.port,
      fetch: app.fetch,
    });

    let servedGraphName: string;
    if (args.graph) {
      const graph = Object.values(initialProject.graphs).find(
        (g) => g.metadata!.id === args.graph || g.metadata!.name === args.graph,
      );
      servedGraphName = graph!.metadata!.name!;
    } else {
      const graph = Object.values(initialProject.graphs).find(
        (g) => g.metadata!.id === initialProject.metadata.mainGraphId,
      );
      servedGraphName = graph!.metadata!.name!;
    }

    console.log(
      `${chalk.green(`Serving project file ${chalk.bold.white(projectFilePath)} on port ${chalk.bold.white(args.port)}.\nServing graph "${chalk.bold.white(servedGraphName)}".`)}`,
    );

    function shutdown() {
      console.log('Shutting down...');

      server.close((err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        process.exit(0);
      });
    }

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
}

async function runGraph({
  project,
  inputs,
  graphId,
  openaiApiKey,
  openaiEndpoint,
  openaiOrganization,
  exposeCost,
}: {
  project: Project;
  inputs: Record<string, LooseDataValue>;
  graphId: GraphId | undefined;
  openaiApiKey: string | undefined;
  openaiEndpoint: string | undefined;
  openaiOrganization: string | undefined;
  exposeCost: boolean;
}): Promise<Outputs> {
  const { run } = createProcessor(project, {
    inputs,
    graph: graphId,
    openAiKey: openaiApiKey,
    openAiEndpoint: openaiEndpoint,
    openAiOrganization: openaiOrganization,
  });

  const outputs = await run();

  if (!exposeCost) {
    delete outputs.cost;
  }

  return outputs;
}

function throwIfNoMainGraph(project: Project, graph: string | undefined, projectFilePath: string) {
  if (!project.metadata.mainGraphId && !graph) {
    const validGraphs = Object.values(project.graphs).map((graph) => [graph.metadata!.id!, graph.metadata!.name!]);

    if (validGraphs.length === 0) {
      throw new Error('No graphs found in the project file. Please edit the project file in Rivet and add a graph.');
    }

    const validGraphNames = validGraphs.map(([id, name]) => `• "${name}" (${id})`);

    const firstExample = `rivet serve ${projectFilePath} --graph ${validGraphs[0]![0]!}`;
    const secondExample = `rivet serve ${projectFilePath} --graph "${validGraphs[0]![1]!}"`;

    throw new Error(
      `No graph name provided, and project does not specify a main graph. Valid graphs are: \n\n${validGraphNames.join(
        '\n',
      )}\n\n Use either the graph's name or its ID. For example, \n• \`${chalk.bold(firstExample)}\` or\n• \`${chalk.bold(secondExample)}\``,
    );
  }
}

function throwIfInvalidGraph(project: Project, graph: string | undefined, projectFilePath: string) {
  if (project.metadata.mainGraphId && !graph) {
    return;
  }

  const matchingGraph = Object.values(project.graphs).find(
    (g) => g.metadata!.id === graph || g.metadata!.name === graph,
  );

  if (!matchingGraph) {
    const validGraphsAndIds = Object.values(project.graphs).flatMap((graph) => [
      graph.metadata!.id!,
      graph.metadata!.name!,
    ]);
    const suggestion = didYouMean(graph!, validGraphsAndIds);

    if (suggestion) {
      throw new Error(
        `Graph "${graph}" not found in project file. Did you mean \`${chalk.bold(`--graph "${suggestion}"`)}\`?`,
      );
    } else {
      const validGraphsAndIds = Object.values(project.graphs)
        .map((graph) => `• "${graph.metadata!.name}" (${graph.metadata!.id})`)
        .join('\n');

      throw new Error(`Graph "${graph}" not found in project file. Valid graphs are: \n${validGraphsAndIds}`);
    }
  }
}

async function getProjectFile(initialProjectFilePath: string | undefined): Promise<string> {
  let projectFilePath = initialProjectFilePath ?? (await getProjectFilePathFromDirectory(process.cwd()));

  throwIfMissingFile(projectFilePath);

  if ((await stat(projectFilePath)).isDirectory()) {
    projectFilePath = await getProjectFilePathFromDirectory(projectFilePath);
  }

  return projectFilePath;
}

async function getProjectFilePathFromDirectory(directory: string): Promise<string> {
  const files = await readdir(directory);
  const projectFiles = files.filter((file) => extname(file) === '.rivet-project');

  if (projectFiles.length === 0) {
    throw new Error('No project file found in the current directory. Project files should end with .rivet-project.');
  }

  if (projectFiles.length > 1) {
    throw new Error(
      `Multiple project files found in the current directory. Please specify which one to serve: \n${projectFiles.join('\n')}`,
    );
  }

  return join(directory, projectFiles[0]!);
}

async function throwIfMissingFile(filePath: string) {
  try {
    await stat(filePath);
  } catch (err) {
    if ((err as any).code !== 'ENOENT') {
      throw err;
    }

    if (isAbsolute(filePath)) {
      const parentDir = filePath.split('/').slice(0, -1).join('/');
      const possibleFiles = await readdir(parentDir);
      const suggestion = didYouMean(filePath, possibleFiles);

      if (suggestion) {
        throw new Error(`Could not find project file "${filePath}". Did you mean "${suggestion}"?`);
      } else {
        throw new Error(`Could not find project file "${filePath}".`);
      }
    } else {
      const possibleFiles = await readdir(process.cwd());
      const suggestion = didYouMean(filePath, possibleFiles);

      if (suggestion) {
        throw new Error(`Could not find project file "${filePath}". Did you mean "${suggestion}"?`);
      } else {
        throw new Error(`Could not find project file "${filePath}".`);
      }
    }
  }
}
