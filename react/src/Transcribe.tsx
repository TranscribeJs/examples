import React, { useRef, useEffect, useState } from "react";
import { FileTranscriber } from "@transcribe/transcriber";
import type { default as CreateModule } from "@transcribe/shout";

const Transcribe = () => {
  const [text, setText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const transcriber = useRef<FileTranscriber | null>(null);

  useEffect(() => {
    // Initialize the transcriber when the component mounts
    async function initializeTranscriber() {
      // dynamically import the createModule function
      // because bundler does not support loading .wasm files
      const createModule: typeof CreateModule = // @ts-ignore
        (await import(/* webpackIgnore: true */ "/shout.wasm.js")).default;

      transcriber.current = new FileTranscriber({
        createModule,
        model: "/ggml-tiny-q5_1.bin",
      });

      await transcriber.current.init();

      setIsReady(true);
    }

    initializeTranscriber();
  }, []);

  async function handleTranscribe() {
    if (!transcriber.current) return;

    try {
      const result = await transcriber.current.transcribe("/jfk.wav", {
        lang: "en",
      });
      setText(result.transcription.map((t: any) => t.text).join(" "));
      console.log(result);
    } catch (error) {
      setText("Transcription failed.");
      console.error(error);
    }
  }

  return (
    <div>
      {!isReady && <p>Loading...</p>}
      {isReady && (
        <p>
          Click the button to transcribe the example wav file. (check console
          for detailed output)
        </p>
      )}
      {isReady && (
        <button
          onClick={handleTranscribe}
          style={{
            padding: "10px 24px",
            margin: "1rem 0",
            fontSize: "1rem",
            borderRadius: "6px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          Transcribe
        </button>
      )}
      <br />
      <br />
      <p>{text}</p>
    </div>
  );
};

export default Transcribe;
