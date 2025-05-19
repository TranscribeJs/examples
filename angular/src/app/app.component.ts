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

  constructor() {
    this.transcriber = new FileTranscriber({
      createModule,
      model: '/ggml-tiny-q5_1.bin',
    });

    this.transcriber.init();
  }

  async transcribe() {
    if (!this.transcriber?.isReady) return;

    this.result = 'Transcribing...';

    // transcribe the file
    // there must be at least one user interaction (e.g click) before you can call this function
    const result = await this.transcriber.transcribe('/jfk.wav', {
      lang: 'en',
    });

    // do something with the result
    this.result = result.transcription.map((t) => t.text).join(' ');
  }
}
