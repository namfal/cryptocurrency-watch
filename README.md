# Crypto Watch

A side project to watch crypto value in real time and related news. I created this app simply to familiarize myself with WebHooks and React Hooks. 

For a live demo, you can visit [here](https://tender-bose-c576c3.netlify.app).

I am using free API endpoints, but these are rate limited.

## To run this locally

Before you run this locally, you need to obtain your own API key from [The Guardian OpenPlatform](https://open-platform.theguardian.com) and put it in the `.env` file:

`REACT_APP_GUARDIAN_API_KEY=YOUR API KEY`

After cloning, `cd` into the directory and run `yarn install && yarn start`.

### Services Used

Crypto data by [coinbase Pro](https://docs.pro.coinbase.com/#fix-api)

News by [The Guardian OpenPlatform](https://open-platform.theguardian.com/access/)

Mesh Gradient by [Mesh](meshgradient.com)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
