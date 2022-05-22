# React Autocomplete

This is a demo of a React Autocompletion component written with minimal dependencies.

## Task

Create an auto-suggest input field, where the user can type the first 2 letters
of a Marvel character and display the available characters in a list below,
similar to the following images.
Notes:

1. Implement your solution using Javascript and React
1. Your target browser is the latest Chrome. No need to cater for outdated
   browsers or cross browser compatibility.
1. Use the Marvel API to retrieve marvel characters in real time
   [using the Marvel API](https://developer.marvel.com/documentation/getting_started). You need to
   register for an API key.
4. You may use Create React App (CRA) or any similar scaffolding tool.
5. You may use any functional libraries of your choice, e.g lodash, rxjs, redux etc.
6. You must NOT use a UI component library (e.g material-ui) as it beats the purpose of this exercise.
7. Please avoid using a CSS framework (e.g bootstrap) to demonstrate your css skills.

## Running

You'll firstly need an API key from the Marvel developer portal. Ensure that
localhost is set as an authorised referring. Set this inside a `.env.local` file.

Example:
```
REACT_APP_MARVEL_API_KEY="your_key"
```

Then run:
```
npm run start
```

Navigate to http://localhost:3000.

# With more time I would

- Write some tests using react-testing-library
- Broken the css file out to separate files for the separate components
- Used sass
- Make the list controllable via arrow keys
