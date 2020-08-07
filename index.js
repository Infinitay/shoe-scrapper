const axios = require('axios').default;
const WAE = require('web-auto-extractor').default;

const sku = "CU0449-601";

// gtin12 == upc-a code
// stadium goods automatically redirects to a specific product if theres a matching sky
axios.get(`https://www.stadiumgoods.com/catalogsearch/result/?q=${sku.replace('-', ' ')}`).then(resp => {
	const parsedSchema = WAE().parse(resp.data);
	if (!!parsedSchema.microdata['Product']) {
		const productData = parsedSchema.microdata['Product'][0];
		console.log(JSON.stringify(productData, null, 4));
	} else {
		console.log("Invalid sku");
	}
});