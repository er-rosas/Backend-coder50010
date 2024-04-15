import { Command } from 'commander';

const program = new Command()

program
    .option('--mode <mode>', 'Especificación de entorno', 'development')
    .parse()

export { program }

// nodemon src/app --mode development
// nodemon src/app --mode production

// en mi caso npx nodemon src/app.js ya que tengo instalado nodemon como :dev
// npx nodemon src/app.js --mode development
// npx nodemon src/app.js --mode production