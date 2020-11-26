<div align="center">
  <h1>
      <img src="../Public/frontend.svg" width="200"> 
      <br>
          Carpark Availability Frontend
      <br>
  </h1>
</div>

<div align="center">
  <p>
    <a href="#installation-guide">Installation Guide</a> •
      <a href="#configuration">Configuration</a>  •
      <a href="#file-structure">File Structure</a>  
  </p>
</div>

# Installation Guide

Install dependencies with

```bash
npm install
#or
yarn install
```

Next, run the development server:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

# Configuration

1. Edit .env sample file with the backend url and append "/api" to the end of the url
    * E.g. "https://localhost:5001/api"
2. Save the file as ".env"

# File Structure

## components

- Contains reusable components found in the main pages

## helperFunctions

- Contains helper functions. No react components here

## pages

- This directory contains the main static pages.


## public

- Locally accessible image files
- Only accessible at build time ([Read more here](https://nextjs.org/learn/basics/data-fetching/two-forms) )

## styles

- Styling for pages components
