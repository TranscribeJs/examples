import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import createModule from '@transcribe/shout';
import { FileTranscriber } from '@transcribe/transcriber';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
  result = '';
  transcriber: FileTranscriber;
  isReady = false;

  constructor() {
    this.transcriber = new FileTranscriber({
      createModule,
      model: '/ggml-tiny-q5_1.bin',
      workerPath: '/',
    });

    this.initTranscribe();
  }

  async initTranscribe() {
    await this.transcriber.init();
    this.isReady = true;
  }

  async transcribeFile() {
    this.result = 'Transcribing...';

    const result = await this.transcriber.transcribe('/jfk.wav', {
      lang: 'en',
    });

    this.result = result.transcription.map((t) => t.text).join(' ');
  }

  onClick() {
    this.transcribeFile();
  }
}
