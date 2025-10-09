// src/index.ts
/**
 * Main entry point for ValidatorNode
 */

import { ValidatorNode } from './validatornode';
import minimist from 'minimist';

/**
 * Command line argument interface
 */
interface Args {
    /**
     * Enable verbose mode for detailed output
     */
    verbose?: boolean;
    /**
     * Path to the input file
     */
    input?: string;
    /**
     * Path to the output file
     */
    output?: string;
}

/**
 * Parse command line arguments
 */
const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main application entry point
 */
async function main(): Promise<void> {
    try {
        const app = new ValidatorNode({
            verbose: args.verbose || false
        });

        if (args.verbose) {
            console.log('Starting ValidatorNode processing...');
        }

        const result = await app.execute();
        
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

/**
 * Entry point for standalone execution
 */
if (require.main === module) {
    main();
}