import { Command } from 'commander';

const program = new Command()

program
    .option('--mode <mode>', 'Especificación de entorno', 'development')
    .parse()

export { program }