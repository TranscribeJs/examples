# Nuxt Example

## Usage

```bash
git clone https://github.com/TranscribeJs/examples

cd examples/nuxt
npm install

# dev
npm run dev

# build
npm run build
npm run preview
```

## Notes

### Import/Bundle & Cross-Origin Headers

Exclude the wasm package from dependency optimization and set `vite.worker.format: "es"`.

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files. For the development and preview server the headers are added in `nuxt.config.ts`.

```js
// nuxt.config.ts

// ...

export default defineConfig({
  // ...
  routeRules: {
    "/**": {
      headers: {
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@transcribe/shout"],
    },
    worker: {
      format: "es",
    },
    server: {
      headers: {
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
    },
  },
});
```

Depending on your deployment target you need to make sure that the webserver sets the correct headers for `shout.wasm.js` .  
`"Cross-Origin-Embedder-Policy": "require-corp"`  
`"Cross-Origin-Opener-Policy": "same-origin"`
