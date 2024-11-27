# Svelte Example

## Usage

```bash
git clone https://github.com/TranscribeJs/examples

cd examples/svelte
npm install

# dev
npm run dev

# build
npm run build
npm run preview
```

## Notes

### Import/Bundle

Rollup is not able to bundle `shout.wasm.js`. To work around this we use an `importmap` that loads the module from `/public/shout.wasm.js`

```html
<!-- index.html -->
<head>
  <!-- ... -->
  <script type="importmap">
    {
      "imports": {
        "@transcribe/shout": "/shout.wasm.js"
      }
    }
  </script>
  <!-- ... -->
</head>
```

and exclude the package from the bundle

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      external: ["@transcribe/shout"],
    },
  },
});
```

### Cross-Origin Headers

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files.

For the development and preview server the headers are added in `vite.config.ts`.

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  preview: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
```

Depending on your deployment target you need to make sure that the webserver sets the correct headers for `shout.wasm.js` and `shout.wasm.worker.mjs` .  
`"Cross-Origin-Embedder-Policy": "require-corp"`  
`"Cross-Origin-Opener-Policy": "same-origin"`
