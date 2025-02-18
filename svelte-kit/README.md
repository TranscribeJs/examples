# SvelteKit Example

## Usage

```bash
git clone https://github.com/TranscribeJs/examples

cd examples/svelte-kit
npm install

# dev
npm run dev

# build
npm run build

# preview (node-adapter)
npm run preview
```

## Notes

### SSR

Transcribe.js only runs in the browser. Node.js is not supported. Make sure to run the code only in browser environment and on/after user interaction.

### Import/Bundle

Exclude the wasm package from dependency optimization and set `worker.format: "es"`.

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  optimizeDeps: {
    exclude: ["@transcribe/shout"],
  },
  worker: {
    format: "es",
  },
});
```

### Cross-Origin Headers

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files.

For the development server the headers are added by a "plugin" in `vite.config.ts`.

```js
// vite.config.ts

// ...

export default defineConfig({
  plugins: [
    {
      name: "configure-response-headers",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          next();
        });
      },
    },
    sveltekit(),
  ],
  // ...
});
```

For the preview server you can use the `adapter-node` in combination with a [custom server](https://svelte.dev/docs/kit/adapter-node#Custom-server) that adds the headers.

```js
// server.js

// ...

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// ...
```

Depending on your deployment target you need to make sure that the webserver sets the correct headers for `shout.wasm.js` and `shout.wasm.worker.mjs` .  
`"Cross-Origin-Embedder-Policy": "require-corp"`  
`"Cross-Origin-Opener-Policy": "same-origin"`
