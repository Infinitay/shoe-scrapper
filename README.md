<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the shoe-scrapper and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** infinitay, shoe-scrapper, CallMeInfinitay, email
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![NPM Version][npm-version-shield]][npm-url]
[![NPM Downloads][npm-downloads-shield]][npm-url]
[![MIT License][license-shield]][license-url]

<!-- [![Contributors][contributors-shield]][contributors-url]
<!-- [![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Shoe Scrapper</h3>

  <p align="center">
    Retrieves relevant data of a shoe such as shoe name, gender, sizes, colorway, and much more from Stadium Goods given the model, or sku, of a shoe.
    <br />
    <!-- <a href="https://github.com/infinitay/shoe-scrapper"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://github.com/Infinitay/shoe-scrapper/blob/master/shoe-scrapper-example.js">Example</a>
    ·
    <a href="https://github.com/infinitay/shoe-scrapper/issues">Report An Issue</a>
    ·
    <a href="https://github.com/infinitay/shoe-scrapper/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

This package was made when I was looking for a way to grab the UPC-A of shoes and I came across [Stadium Goods](https://www.stadiumgoods.com/)'s website as they also had the GTIN-12 of shoes. As far as I know, both UPC-A and GTIN-12 are identical in that UPC-A is just a different representation of a GTIN-12. In addition to retrieving the GTIN-12 of a shoe, because this package pulls the data from [Stadium Goods](https://www.stadiumgoods.com/), there is additional information such as market data for the shoe and other general information of the product.

### Built With

- [@rane/web-auto-extractor](https://www.npmjs.com/package/@rane/web-auto-extractor)
- [axios](https://www.npmjs.com/package/axios)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the shoe-scrapper

```sh
git clone https://github.com/infinitay/shoe-scrapper.git
```

2. Install NPM packages

```sh
npm install
```

<!-- USAGE EXAMPLES -->

## Usage

Fetch a product's data by its sku, or model, and print it out.

```js
const skuScrapper = require("./index.js");

const sku = "CU0449-601";

(async () => {
  console.log(JSON.stringify(await skuScrapper.getProductData(sku), null, 4));
})();
```

Fetch a product's data by its sku, or model, filters out sizes that don't have a UPC, and returns an array of objects `{ size: String, upc: String }`

```js
const skuScrapper = require("./index.js");

const sku = "CU0449-601";

// Retrieve all sizes and its respective upc-a/gtin-12
skuScrapper.getProductData(sku).then((productData) => {
  const transmuted = productData.marketData.offers
    .filter((offer) => !!offer["gtin12"])
    .map((offer) => {
      return { size: offer.size, upc: offer["gtin12"] };
    });
  console.log(transmuted);
});
```

<!-- ROADMAP -->

## Roadmap

- Help contribute to [The Sneaker Database](https://thesneakerdatabase.com/) in order to limit and possibly avoid using [Stadium Goods](https://www.stadiumgoods.com/) in return for an API intended for fetching data.
- Use this project to help gather GTIN-12s and start a database of my own to use in a future app and hopefully use that to crowd-source future GTIN-12 collection.

### Potential Additions

- Provide methods to allow users to easily retrieve sizings and GTIN-12s rather than parsing it themselves.
- Provide a uniform parsing system to avoid inconsistencies and make sizing more clear on some trading platforms such as [StockX](https://stockx.com/).
  - Currently, AJ1 Retros on [StockX](https://stockx.com/) such as the [Royal Toe (555088-041)](https://stockx.com/air-jordan-1-retro-high-black-game-royal) list gs sizes (3.5 to 7) under their adult/mens shoe. I would like to make the product data returned more clear which sizing it refers to. \* Note however, there are still some inconsistencies even on [Stadium Goods](https://www.stadiumgoods.com/) such as on the [AJ1 Retro Satin Snakes PS (CU0449-601)](https://www.stadiumgoods.com/air-jordan-1-high-retro-ps-satin-snake-cu0449-601) where it has both toddler and preschool sizings.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Twitter: [@CallMeInfinitay](https://twitter.com/CallMeInfinitay)

Project Link: [https://github.com/infinitay/shoe-scrapper](https://github.com/infinitay/shoe-scrapper)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Stadium Goods](https://www.stadiumgoods.com/) - Without them this wouldn't be possible, so thank you.

## Disclaimer

Since this depends on scrapping [Stadium Goods](https://www.stadiumgoods.com/), if you, [Stadium Goods](https://www.stadiumgoods.com/), has any issues with this, please let me know and I will take it down. For everyone else, I would like to request of you to not flood their site with requests and try to limit the scraping you do to not negatively impact their site and therefore anyone elses experience. Unfortunately they are the only ones that _publicly_ provide GTIN-12s and it's best to avoid forcing them to remove it due to people mass scrapping. That's why in the future I'd like to use this project to help [The Sneaker Database](https://thesneakerdatabase.com/) as I describe in the [roadmap](#roadmap). That way, people won't have to depend on this package entirely, and instead call [The Sneaker Database](https://thesneakerdatabase.com/)'s API.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/infinitay/shoe-scrapper.svg?style=flat-square
[contributors-url]: https://github.com/Infinitay/shoe-scrapper/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/infinitay/shoe-scrapper.svg?style=flat-square
[forks-url]: https://github.com/Infinitay/shoe-scrapper/network/members
[stars-shield]: https://img.shields.io/github/stars/infinitay/shoe-scrapper.svg?style=flat-square
[stars-url]: https://github.com/Infinitay/shoe-scrapper/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/infinitay/shoe-scrapper.svg?style=flat-square
[issues-url]: https://github.com/Infinitay/shoe-scrapper/issues
[license-shield]: https://img.shields.io/github/license/infinitay/shoe-scrapper.svg?style=flat-square
[license-url]: http://vjpr.mit-license.org
[npm-url]: https://npmjs.org/package/shoe-scrapper
[npm-version-shield]: https://img.shields.io/npm/v/shoe-scrapper.svg?style=flat-square
[npm-downloads-shield]: https://img.shields.io/npm/dt/shoe-scrapper?style=flat-square
