const skuScrapper = require('./index.js');

const sku = "CU0449-601";

// Quick snippet
(async () => {
	console.log(JSON.stringify(await skuScrapper.getProductData(sku), null, 4));
})();

// Retrieve all sizes and its respective upc-a/gtin-12
skuScrapper.getProductData(sku).then(productData => {
	const transmuted = productData.marketData.offers.filter(offer => !!offer["gtin12"])
		.map(offer => { return { 'size': offer.size, 'upc': offer["gtin12"] } });
	console.log(transmuted);
});
