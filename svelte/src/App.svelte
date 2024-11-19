<script lang="ts">
  import createModule from "@transcribe/shout";
  import { FileTranscriber } from "@transcribe/transcriber";

  $: text = "";

  async function transcribe() {
    const transcriber = new FileTranscriber({
      createModule,
      model: "/ggml-tiny-q5_1.bin",
      workerPath: "/",
    });

    await transcriber.init();
    const result = await transcriber.transcribe("/jfk.wav", { lang: "en" });

    text = result.transcription.map((t) => t.text).join(" ");
  }
</script>

<main>
  <h1>Transcribe.js Svelte Example</h1>
  <p>
    Click the button to transcribe the example wav file. (check console for
    detailed output)
  </p>
  <button on:click={transcribe}>Transcribe</button>

  {#if text}
    <p><b>Result:</b>{text}</p>
  {/if}
</main>
