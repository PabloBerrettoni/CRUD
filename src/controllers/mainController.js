const fs = require('fs');
const path = require('path');
const {getProducts} = require('../data/data');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('index', {products: getProducts});
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
