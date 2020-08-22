const fs = require('fs');
const chalk = require('chalk');

const address = 'notes.json';

const getNotes = (title) => {
    const notes = loadNotes(address);
    const targetNode = notes.find((node) => node.title === title);

    if(targetNode){
        console.log(chalk.bgGreen.bold(targetNode.title));
        console.log(targetNode.description);
    }
    else{
        console.log(chalk.bgRed.white.bold('ERROR file not found'))
    }
}

const addNote = (title, description) => {
    const notes = loadNotes(address);
    const dublicateNote = notes.find((node) => node.title === title);

    if(dublicateNote){
        const newNote = {
            title: title,
            description: description
        }
        
        notes.push(newNote);
    }else{
        console.log("note exist");
    }

    saveNotes(notes, address);
}

const saveNotes = (notes, address) => fs.writeFileSync(address, JSON.stringify(notes));

const loadNotes = (address) => {
    try{
        const dataBuffer = fs.readFileSync(address);
        const strData = dataBuffer.toString();
        return JSON.parse(strData);
    }
    catch(e){
        throw (Error('cannot find file', e));
    }  
}

const removeNote = (title) => {
    const notes = loadNotes(address);

    let newNotes = notes.filter((note) => 
        (note.title !== title)
    );

    if (newNotes.length === notes.length){
        console.log(chalk.bgRed.bold('Note is not found!'));
    }
    else{
        console.log(chalk.bgGreen.bold('Successfully Deleted!'));
    }

    saveNotes(newNotes, address);
}

const listNotes = () =>{
    const notes = loadNotes(address);
    notes.forEach(note => {
        console.log(chalk.bold.black.bgWhite(note.title));
        console.log(chalk.bold.white.bgBlack(note.description));
    });
}


module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes
}