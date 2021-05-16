const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const searchResult = result.find((contact) => contact.id === contactId);

    console.table(searchResult);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const updatedContacts = result.filter(
      (contact) => contact.id !== contactId
    );
    const updatedList = JSON.stringify([...updatedContacts], null, "\t");
    await fs.writeFile(contactsPath, updatedList);
    const updatedListForConsole = JSON.parse(updatedList);
    console.table(updatedListForConsole);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactNew = { id: shortid.generate(), name, email, phone };
    const contactsList = JSON.stringify([contactNew, ...contacts], null, "\t");
    await fs.writeFile(contactsPath, contactsList);
    const updatedContacts = JSON.parse(contactsList);
    console.table(updatedContacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
