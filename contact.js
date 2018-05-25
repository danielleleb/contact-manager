#!/usr/bin/env node
const program = require('commander');
const { addContact, getContact, deleteContact } = require('./logic');
const { prompt } = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Enter firstname ...'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Enter lastname ...'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter phone number ...'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email address ...'
    }
    
]

program
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() => {
        prompt(questions).then(answers => 
        addContact(answers));
    });

program
    .version('0.0.1')
    .description('Contact management system')

// program
//     .command('addContact <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description('Add a contact')
//     .action((firstname, lastname, phone, email) => {
//         addContact({firstname, lastname, phone, email});
//     });

program
    .command('getContact <name>')
    .alias('r')
    .description('Get contact')
    .action(name => getContact(name));

program
    .command('deleteContact')
    .alias('d')
    .description('Delete a contact')
    .action((firstname) => {
        deleteContact({firstname})
    })

program.parse(process.argv); 

