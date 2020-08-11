const axios = require('axios').default;
const WAE = require('@rane/web-auto-extractor').default;

/* 
* Stockx is very inconsistent with sizings... 
* Looking at their pricing API for Jordan's, sometimes they append a character to the property 'shoeSize'
* AJ1 Retro Satin Snake (Womens): They append 'W' to the sizes ie. "10W", "7W" | 'gender': 'women'
* AJ1 Retro Satin Snake PS (Womens): They don't 'W' to the sizes or anything ie. "10.5", "4" | 'gender': 'preschool'
* AJ1 Retro Satin Snake TD (Womens): They don't 'W' to the sizes or anything ie. "2", "4" | 'gender': 'toddler'
* AJ1 Retro High Royal Toe: They don't append anything to their sizes, not even for gs sizes under mens product ie. "5", "10" | 'gender': 'men'
* AJ12 Retro Uni Gold GS: They append "Y" to the sizes ie. "5.5Y", "7Y" | 'gender": 'child'
*/
const reg = /\- ([\d.YCW]+)$/;

async function getUnparsedProductData(sku) {
	try {
		// stadium goods automatically redirects to a specific product if theres a matching sku
		const resp = await axios.get(`https://www.stadiumgoods.com/catalogsearch/result/?q=${sku.replace('-', ' ')}`);
		const parsedSchema = WAE().parse(resp.data);
		if (!!parsedSchema.microdata['Product']) {
			const productData = parsedSchema.microdata['Product'][0];
			return productData;
		}
		else {
			console.log("Invalid sku");
			return undefined;
		}
	}
	catch (err) {
		console.log(err);
		return err;
	}
}

async function getProductData(sku) {
	try {
		const product = await getUnparsedProductData(sku);

		// Get rid of Schema properties 
		delete product["@context"];
		delete product["@type"];
		delete product.offers["@context"];
		delete product.offers["@type"];

		// Clean up name and add the dash to sku that Stadiumgoods omits
		product.name = product.name.replace(/“|”/g, '"'); // Stadiumgoods (HTML) uses both these instead '"'
		product.sku = product.sku.replace(/\s/g, '-');

		for (const offer of product.offers.offers) {
			// Get rid of Schema properties 
			delete offer["@context"];
			delete offer["@type"];

			// availability property returns a string to a Schema URL ending with "InStock" or "OutOfStock"
			offer.inStock = offer.availability.endsWith("InStock") ? true : false;
			delete offer.availability;

			// Lets also add a size property while we're here and get rid of name since we don't need it
			offer.size = reg.exec(offer.name)[1];
			delete offer.name;
		}
		// Lets make things less confusing too
		product["marketData"] = product.offers;
		delete product.offers;
		return product;
	} catch (e) {
		console.log(e);
		return e;
	}
}

module.exports = {
	getProductData: getProductData
};
