const fs = require('fs');
const path = require('path');
const {getProducts, saveDb} = require('../data/data');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products: getProducts});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productRequiredId = +req.params.id;
		let productRequired = getProducts.find(product => {
			if(product.id == productRequiredId) {
				return product;
			}
		})
		res.render('detail', {product: productRequired});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let lastId = 1;
		getProducts.forEach(element => {
			if (element.id > lastId) {
				lastId = element.id;
			};
		})
		let newProduct = {
			id: lastId+1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename
		}
		getProducts.push(newProduct);
		saveDb(getProducts);
		res.redirect(`/products/detail/${lastId+1}`)
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productRequiredId = +req.params.id;
		let productRequired = getProducts.find(product => {
			if(product.id == productRequiredId) {
				return product;
			}
		})
		res.render('product-edit-form', {product: productRequired});
	},
	// Update - Method to update
	update: (req, res) => {
		console.log(req.file.filename)
		getProducts.forEach(element => {
            if (element.id === +req.params.id) {
                element.name = req.body.name ? req.body.name : element.name,
                element.price = req.body.price ? req.body.price : element.price,
                element.discount = req.body.discount ? req.body.discount : element.discount,
                element.category = req.body.category ? req.body.category : element.category,
                element.description = req.body.description ? req.body.description : element.description,
				element.image = req.file.filename ? req.file.filename : element.image
            }
        })
		saveDb(getProducts);
		res.redirect(`/products/detail/${+req.params.id}`);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = +req.params.id;
		getProducts.forEach(product => {
			if (product.id == productId) {
				let productIndex = getProducts.indexOf(product);
				getProducts.splice(productIndex, 1);
			}
		})
		saveDb(getProducts);
		res.redirect('/products');
	}
};

module.exports = controller;