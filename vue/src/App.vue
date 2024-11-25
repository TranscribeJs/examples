<script setup lang="ts">
import { ref } from 'vue'
import createModule from '@transcribe/shout'
import { FileTranscriber } from '@transcribe/transcriber'

const text = ref<string>('')

async function transcribe() {
  const transcriber = new FileTranscriber({
    createModule,
    model: '/ggml-tiny-q5_1.bin',
    workerPath: '/',
  })

  await transcriber.init()
  const result = await transcriber.transcribe('/jfk.wav', { lang: 'en' })

  text.value = result.transcription.map((t) => t.text).join(' ')
}
</script>

<template>
  <main>
    <h1>Transcribe.js Vue Example</h1>

    <p>Click the button to transcribe the example wav file. (check console for detailed output)</p>

    <button @click="transcribe">Transcribe</button>

    <p v-if="text !== ''"><b>Result:</b>{{ text }}</p>
  </main>
</template>
