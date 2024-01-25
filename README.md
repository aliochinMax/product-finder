# ProductFinder

Authors: Maksim Aliochin, Abigail Wright, Michael Dawson

# ![License Badge](https://shields.io/badge/license-MIT-green)

## Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [How To Contribute](#how-to-contribute)
- [Predevelopment](#predevelopment)
- [Further Development](#further-development)
- [Screenshots Of Development](#screenshots-of-development)

## Description

This project is to make an application where a user can search for a product or item by image, for example, a toy that another child has that your's might be interested in that you can find different pricing for that product or similar. If the product is not found an error is returned e.g. product not found, here are some other suggestions. Technologies used
APIs:

- Visions API by Google: https://cloud.google.com/vision#vision-product-search
  -Real Time Product Search API from RapidAPIs: https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-product-search/pricing
  FrontEnd Stack:
  -HTML
  -CSS
  -JS
  -React
  -Vite
  Packages found in package.json

### User Story: As a user

I want to search for an product by image
I want to be able to compare pricing from different retailers
If I cannot find the exact product then I can see results of similar product

## How To Use

Head over to https://main--coolerproductfinder.netlify.app, and search away (note api's may be fully used), if you want to run it locally create a .env file with your google vision api key and real time product search api key and endpoint. Variables names should be:VITE_REACT_APP_RAPIDAPI_KEY, VITE_REACT_APP_RAPIDAPI_HOST, VITE_REACT_APP_GOOGLE_VISION_API.

## How To Contribute

Fork the project and make a pull request when ready

## Predevelopment

Wireframe (Figma Link): https://www.figma.com/file/btlmxildL91DxxmURAQU46/Product-Finder-Design?type=design&node-id=0%3A1&mode=design&t=h3uzJ4Yf2bsXWsnh-1

## Further Development

Find a more reliable and more extensive product finding API. The Real time product search results are quite random.
Responsiveness.
Accessibility arrows for carousels (Some users may not be able to hold down on the screen).
Styling.

## Screenshots Of Development

### In Developement

![Alt text](readme-images\ExampleOfButtonAndDragAndDrop.png)
![Alt text](readme-images\ExampleOfProductCards.png)
![Alt text](readme-images\ExampleOfProducts.png)

### Finished Development (as of 25/01/24)

![Alt text](readme-images\Input.png)
![Alt text](readme-images\FinishedProductGrid.png)
