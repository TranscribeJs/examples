<script setup lang="ts">
import { onMounted, ref } from 'vue'
import createModule from '@transcribe/shout'
import { FileTranscriber } from '@transcribe/transcriber'

let transcriber: FileTranscriber

const isReady = ref<boolean>(false)
const text = ref<string>('')

async function transcribe() {
  if (!transcriber?.isReady) return

  text.value = 'Transcribing...'

  // transcribe the file
  // there must be at least one user interaction (e.g click) before you can call this function
  const result = await transcriber.transcribe('/jfk.wav', { lang: 'en' })

  // do something with the result
  text.value = result.transcription.map((t) => t.text).join(' ')
}

onMounted(async () => {
  // create new instance
  transcriber = new FileTranscriber({
    createModule,
    model: '/ggml-tiny-q5_1.bin',
  })

  // and initialize the transcriber
  await transcriber.init()

  isReady.value = true
})
</script>

<template>
  <main>
    <h1>Transcribe.js Vue Example</h1>

    <p>Click the button to transcribe the example wav file. (check console for detailed output)</p>

    <template v-if="isReady">
      <button @click="transcribe">Transcribe</button>

      <p v-if="text !== ''"><b>Result:</b>{{ text }}</p>
    </template>
  </main>
</template>
