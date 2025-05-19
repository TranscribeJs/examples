# Next.js (React) Example

## Usage

```bash
git clone https://github.com/TranscribeJs/examples

cd examples/react
npm install

# dev
npm run dev

# build
npm run build

# start (production)
npm start
```

## Notes

### Browser Only

Transcribe.js only runs in the browser. Node.js is not supported. Make sure to run the code only in the browser environment and on/after user interaction.

### Import/Bundle

- The WASM worker file (`shout.wasm.js`) is placed in the `public/` directory and loaded at runtime. It is **not** imported or bundled by Next.js/Webpack.
- The `FileTranscriber` is initialized after dynamically loading the script and accessing the global `createModule`.
- See `src/Transcribe.tsx` for the loading pattern.

### Static Assets

- Model and audio files (`ggml-tiny-q5_1.bin`, `jfk.wav`, etc.) are also placed in `public/` and referenced by URL (e.g., `/ggml-tiny-q5_1.bin`).

### Cross-Origin Headers

The WASM files must be served with the correct Cross-Origin headers. Otherwise, browsers will refuse to load the files.

For the development server, headers are set in `next.config.ts`:

```ts
// next.config.ts
export default {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};
```

For production, ensure your deployment target/webserver sets these headers for `shout.wasm.js` and any other WASM/worker files:

- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Opener-Policy: same-origin`

### Postinstall Script

A `postinstall` script in `package.json` copies `shout.wasm.js` from the package location to the `public/` directory after install.

---

For more details, see the code and comments in `src/Transcribe.tsx` and `next.config.ts`.
