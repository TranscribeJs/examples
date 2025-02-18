# Vue Example

## Usage

```bash
git clone https://github.com/TranscribeJs/examples

cd examples/vue
npm install

# dev
npm run dev

# build
npm run build
npm run preview
```

## Notes

### Import/Bundle

Exclude the wasm package from dependency optimization and set `worker.format: "es"`.

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  optimizeDeps: {
    exclude: ['@transcribe/shout'],
  },
  worker: {
    format: 'es',
  },
})
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
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  preview: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})
```

Depending on your deployment target you need to make sure that the webserver sets the correct headers for `shout.wasm.js` and `shout.wasm.worker.mjs` .  
`"Cross-Origin-Embedder-Policy": "require-corp"`  
`"Cross-Origin-Opener-Policy": "same-origin"`
