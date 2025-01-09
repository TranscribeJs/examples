<script lang="ts">
  import { FileTranscriber } from "@transcribe/transcriber";
  import { onMount } from "svelte";

  let isReady = $state(false);
  let createModule: (args?: {}) => Promise<any>;
  let transcriber: FileTranscriber;
  let text = $state("");

  async function transcribe() {
    // check if wasm module is loaded
    if (!createModule) {
      console.error("WASM module not loaded yet");
      return;
    }

    if (!transcriber?.isReady) return;

    text = "Transcribing...";

    // transcribe the file
    // there must be at least one user interaction (e.g click) before you can call this function
    const result = await transcriber.transcribe("/jfk.wav", { lang: "en" });

    // do something with the result
    text = result.transcription.map((t) => t.text).join(" ");
  }

  onMount(async () => {
    // dynamic import wasm module from static/ folder
    // this is a workaround because Rollup can't bundle this file
    createModule = (await import("/shout.wasm.js?url"))
      .default as unknown as (args?: {}) => Promise<any>;

    // create new instance
    transcriber = new FileTranscriber({
      createModule,
      model: "/ggml-tiny-q5_1.bin",
      workerPath: "/",
    });

    // and initialize the transcriber
    await transcriber.init();

    isReady = true;
  });
</script>

<h1>Transcribe.js SvelteKit Example</h1>

<p>
  Click the button to transcribe the example wav file. (check console for
  detailed output)
</p>

{#if isReady}
  <button onclick={transcribe}>Transcribe</button>

  {#if text}
    <p><b>Result:</b> {text}</p>
  {/if}
{/if}
