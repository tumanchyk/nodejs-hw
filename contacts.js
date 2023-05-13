 const fs = require('fs/promises');
 const path = require('path');
 const {nanoid} = require('nanoid')
 const contactsPath = path.join(__dirname, '/db/contacts.json');
 
  async function listContacts() {
    const contacts = await fs.readFile(contactsPath)
    return JSON.parse(contacts)
  }
  
  async function getContactById(contactId) {
      const idEl = contactId;
      const contacts = await listContacts();
      const contact = contacts.find(item => item.id === idEl);
      return contact || null
  }
  
  async function removeContact(contactId) {
      const idEl = contactId;
      const contacts = await listContacts();
      const index = contacts.findIndex(item => item.id === idEl );
      if(index === -1){
        return null
      }
      const [result] = contacts.splice(index, 1)
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      return result

  }
  
  async function addContact(data) {
     const contacts = await listContacts();
     const newContact ={id: nanoid(), ...data};
     contacts.push(newContact);
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
     return newContact
   }
   module.exports = {listContacts, getContactById, removeContact, addContact}