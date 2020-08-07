const axios = require('axios').default;
const WAE = require('web-auto-extractor').default;

const url = `https://www.stadiumgoods.com/air-jordan-1-retro-high-og-gs-royal-toe-575441-041`;

// gtin12 == upc-a code
axios.get(url).then(resp => {
	const parsedSchema = WAE().parse(resp.data);
	const productData = parsedSchema.microdata['Product'][0];
	console.log(JSON.stringify(productData, null, 4));
});