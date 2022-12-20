const fs = require("fs/promises");
const path = require("path");

const pathToFile = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
     reader : async () => {
        const buffer = await fs.readFile(pathToFile);
        return JSON.parse(buffer.toString());  // с JSON переводим в объект

    },

     writer : async (usersDb) => {
        await fs.writeFile(pathToFile, JSON.stringify(usersDb)); // с объекта переводим в JSON
    },
}