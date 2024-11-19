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

Rollup is not able to bundle `shout.wasm.js`. Also using an `importmap` like in Svelte doesn't work. To work around this we use a dynamic import that loads the module from `/static/shout.wasm.js`

```js
// +page.svelte
import { onMount } from "svelte";
import { FileTranscriber } from "@transcribe/transcriber";

let createModule;

// ... use transcriber

onMount(async () => {
  // dynamic import wasm module from /static
  // this is a workaround because Rollup can't bundle this file
  createModule = (await import("/shout.wasm.js?url")).default;
});
```

and exclude the import file from the bundle

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      external: ["/shout.wasm.js?url"],
    },
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
