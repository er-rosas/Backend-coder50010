import { Command } from 'commander';

const program = new Command()

program
    .option('--mode <mode>', 'Especificación de entorno', 'development')
    // .option('-d', 'Variable para debug', false)
    // .option('-p, --port <port>', 'Puerto en el que se inicia nuestro server', 8080)
    // .option('-u <user>', 'Usuario utilizado en el server', 'No se ha declarado un usuario')
    .parse()

// const {
//     d,
//     port,
//     mode,
//     u
// } = program.opts()
// console.log('Opciones: ', mode, port);

export { program }