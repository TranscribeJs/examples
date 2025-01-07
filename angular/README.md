# Angular Example

## Usage

```bash
git clone https://github.com/TranscribeJs/examples

cd examples/angular
npm install

# dev
npm start

# build
npm run build
```

## Notes

### Bundle Size Limit

You propably need to increase the `budgets.maximumError` for the maximum bundle size. Search for `budget` in `angular.json`.

```js
// angular.json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kB",
    "maximumError": "5MB"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "4kB",
    "maximumError": "8kB"
  }
],
```

### Cross-Origin Headers

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files.

For the development server the headers are added in `angular.json`.

```js
// angular.json
{
  // ...
  serve: {
    // ...
    options: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
  },
  // ...
}
```

Depending on your deployment target you need to make sure that the webserver sets the correct headers for `shout.wasm.js` and `shout.wasm.worker.mjs` .  
`"Cross-Origin-Embedder-Policy": "require-corp"`  
`"Cross-Origin-Opener-Policy": "same-origin"`
