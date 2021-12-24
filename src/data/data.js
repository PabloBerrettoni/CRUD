const fs = require('fs');
const path = require('path');

module.exports = {
    getProducts: JSON.parse(fs.readFileSync(path.join(__dirname, 'productsDataBase.json'), 'utf-8')),
    saveDb: (database) => {
        fs.writeFileSync(path.join(__dirname, 'productsDataBase.json'), JSON.stringify(database));
    }
}