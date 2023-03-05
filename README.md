# 3D Design NFT Minter

Sample NFT opensea link : https://testnets.opensea.io/assets/goerli/0x2d972f99467ec9747aaeb276ce29c8a93a3b3087/2/

This project(3D Design Creator NFT) involves deploying and minting NFT tokens, 3D print design STL files.

The 3D Design Creator NFT build offers a service that allows users to purchase high-quality 3D print outputs by subscribing to a copyright system for STL 3D design files. Unlike traditional online copyright systems, this project allows customers to buy and trade their copyrighted designs.
Buyer can have 3D print design with Copyright, It makes additional benefits to buyers more than self-complaceny.
To provide additional benefits to buyers, a 3D Design Buyer NFT will be created so that they can also benefit from owning the copyright to their designs.

# Installation
To use this 3D printer creator minter, you'll need to do the following:

1. Run `npm install` to download the `node_modules` folder.
2. Download the [dotenv package](https://www.npmjs.com/package/dotenv) in your project directory by running `npm install dotenv --save` in your terminal
3. Download hardhat in your project directory by running 'npm install hardhat --save;npx hardhat compile' and deploy by this command 'npm run script/deploy.js --network goerli'
3. Create a `.env` file in the root directory this `3D design nft-minter` and add your [Alchemy API Key](https://docs.alchemyapi.io/alchemy/tutorials/nft-minter#create-your-alchemy-api-key) and [Pinata Key and Secret](https://pinata.cloud/keys). Altogether, your `.env` file should look like so:

```
REACT_APP_PINATA_KEY=""
REACT_APP_PINATA_SECRET=""
REACT_APP_ALCHEMY_KEY=""

API_URL=""
PRIVATE_KEY=""
PUBLIC_KEY = ""
API_KEY=""
CONTRACT_ADDRESS=""

```
4. Run `npm start`in your terminal to open the minter in your browser at http://localhost:3000/.
