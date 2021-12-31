# Buildspace: Mint your own NFT collection

A repository for the [Buildspace](https://buildspace.so)'s *"[Mint your own NFT collection and ship a Web3 app to show them off](https://app.buildspace.so/projects/CO961ddb5f-f428-4608-9949-a9a2f461eb3f)"* project.

## Debriefing

During the project, the following tasks have been accomplished:
- Deploy a custom ERC-721 token ([Etherscan link](https://rinkeby.etherscan.io/address/0xbefe66409b915e1906f6ce500cb82b796eea8a32))
- Build and deploy a dapp for NFT minting ([Website link](https://buildspace-mint-rugnft.netlify.app/))

<hr />

## Requirements

- [Node.js](https://nodejs.org/en/)

## Development

#### Blockchain scripts

1. Navigate to the `_contract` folder and install project dependencies:
	```
    npm install
    ```
1. Copy the `.env.example` file as `.env` and provide values for all required fields.
2. Execute the deployment script:
	```
    npx hardhat run scripts/deploy.js --network rinkeby
    ```

#### Frontend client

1. Install project dependencies:
	```
    npm install
    ```
2. Start the application in development mode:
	```
    npm run start
    ```

## Deployment

1. If not done during development, install project dependencies:
	```
    npm install
    ```
2. Generate the production build of the application:
	```
    npm run build
    ```
3. Using the web server of your preference, publish the contents of the generated `build` directory.

## Resources
- [Buildspace: Mint your own NFT collection and ship a Web3 app to show them off](https://app.buildspace.so/projects/CO961ddb5f-f428-4608-9949-a9a2f461eb3f)
- [Alchemy](https://www.alchemy.com/)