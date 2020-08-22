const util = require('./utils')
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');
//import validator from 'validator'; // hata

// console.log(chalk.inverse.bgYellow.green.bold('Success!'));
// console.log(util.add(2,3));

// console.log("app", util.name);

// console.log(validator.isEmail('@g.com'));

// console.log(process.argv);


// console.log(yargs.argv);

yargs.command({
    command: 'add',
    describe: 'adding a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'descripton is this real',
            demand: true,
            type: 'string',
        }
    },
    handler : (argv) => {
        // console.log('Title: ', argv.title);
        // console.log('Description: ', argv.description);
        notes.addNote(argv.title, argv.description);
    }
}).argv;
   
yargs.command({
    command: 'remove', describe: 'removing a note',
    builder: {
        title: {
            describe: 'remove function',
            demand: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('removing a note!');
        notes.removeNote(argv.title);
    }
}).argv;

yargs.command({
    command: 'list', describe: 'list a note', handler() {
        notes.listNotes();
    }
}).argv;

yargs.command({
    command: 'read', describe: 'read a note', 
    builder: {
        title: {
            demand: true,
            type: 'string'
        }
    }, handler(argv) {
        notes.getNotes(argv.title)
    }
}).argv;