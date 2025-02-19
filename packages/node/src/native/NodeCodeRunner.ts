import type { CodeRunner, CodeRunnerOptions, Inputs, Outputs } from '@ironclad/rivet-core';
import { createRequire } from 'node:module';

export class NodeCodeRunner implements CodeRunner {
  async runCode(code: string, inputs: Inputs, options: CodeRunnerOptions): Promise<Outputs> {
    const argNames = ['inputs'];
    const args: any[] = [inputs];

    if (options.includeRequire) {
      argNames.push('require');
      const require = createRequire(import.meta.url);
      args.push(require);
    }

    if (options.includeFetch) {
      argNames.push('fetch');
      args.push(fetch);
    }

    if (options.includeRivet) {
      const Rivet = await import('@ironclad/rivet-node');

      argNames.push('Rivet');
      args.push(Rivet);
    }

    argNames.push(code);

    console.dir({ argNames, args });

    const AsyncFunction = async function () {}.constructor as new (...args: string[]) => Function;
    const codeFunction = new AsyncFunction(...argNames);
    const outputs = await codeFunction(...args);

    return outputs;
  }
}
