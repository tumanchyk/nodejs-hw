const yargs = require("yargs");
const {hideBin} = require('yargs/helpers')
const contacts = require('./contacts')


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);

    case "add":
      const newContact = await contacts.addContact({name, email, phone});
      return console.table(newContact);

    case "remove":
        const removedContact = await contacts.removeContact(id);
        return console.table(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
const arr = hideBin(process.argv);
const {argv} = yargs(arr)
invokeAction(argv);

