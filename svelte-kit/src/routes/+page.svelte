<script lang="ts">
  import { FileTranscriber } from "@transcribe/transcriber";
  import { onMount } from "svelte";

  let createModule: (args?: {}) => Promise<any>;
  let text = $state("");

  async function transcribe() {
    if (!createModule) {
      console.error("WASM module not loaded yet");
      return;
    }

    const transcriber = new FileTranscriber({
      createModule,
      model: "/ggml-tiny-q5_1.bin",
      workerPath: "/",
    });

    await transcriber.init();

    const result = await transcriber.transcribe("/jfk.wav", { lang: "en" });
    text = result.transcription.map((t) => t.text).join(" ");
  }

  onMount(async () => {
    // dynamic import wasm module from static/ folder
    // this is a workaround because Rollup can't bundle this file
    createModule = (await import("/shout.wasm.js?url"))
      .default as unknown as (args?: {}) => Promise<any>;
  });
</script>

<h1>Transcribe.js SvelteKit Example</h1>

<p>
  Click the button to transcribe the example wav file. (check console for
  detailed output)
</p>

<button onclick={transcribe}>Transcribe</button>

{#if text}
  <p><b>Result:</b> {text}</p>
{/if}
