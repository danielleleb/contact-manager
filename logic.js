'use strict'

const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/contact-manager');

function toLower(v) {
    return v.toLowerCase();
}

const contactSchema = mongoose.Schema({
    firstname: { type: String, set: toLower },
    lastname: { type: String, set: toLower },
    phone: { type: String, set: toLower },
    email: { type: String, set: toLower }
});

const Contact = mongoose.model('Contact', contactSchema);

const addContact = (contact) => {
    Contact.create(contact, (err) => {
        assert.equal(null, err);
        console.info('New contact added');
        mongoose.disconnect();
    });
};

const getContact = (name) => {
    const search = new RegExp(name, 'i');
    Contact.find({$or: [{firstname: search}, {lastname: search}]})
    .exec((err, contact) => {
        assert.equal(null, err);
        console.info(contact);
        console.info(`${contact.length} matches`);
        mongoose.disconnect();
    });
};

const deleteContact = (name) => {
    const search = new RegExp(name, 'i');
    Contact.findOneAndRemove({firstname: search})
    .exec((err, contact) => {
        assert.equal(null, err);
        console.info("Successfully deleted.");
        mongoose.disconnect();
    })
};

const getAllContacts = () => {
    Contact.find({})
    .exec((err, contacts) => {
        console.info(contacts)
        mongoose.disconnect();
    })
}

module.exports = { addContact, getContact, deleteContact, getAllContacts }