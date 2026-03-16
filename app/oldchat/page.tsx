'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import { Streamdown } from 'streamdown';
import { useChatStore } from '@/store/useChatStore';
import { useRouter } from 'next/navigation';

export default function Chat() {

  const router = useRouter()

  const [input, setInput] = useState('');
  // const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [data, setData] = useState<string[]>([]);

  const { chat, setChat } = useChatStore();

  const { messages, sendMessage, status } = useChat({
    messages: chat,
    onFinish: (modelMessages) => {
      setChat(modelMessages.messages);
    }
  });

  const sendResource = async () => {
    await fetch('http://localhost:8000/api/chatbot/embed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: input }),
    });
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const arrayBuffer = e.target?.result;
      if (!arrayBuffer) return;

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the first sheet to JSON (array of arrays)
      // Convert sheet to 2D array (each row = array of cells)
      const rows = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, {
        header: 1,
      });

      // Extract second column, clean, deduplicate, and join
      const uniqueLines = Array.from(
        new Set(
          rows
            .slice(1) // skip header
            .map((row) => row[1]) // get second column
            .filter((cell) => cell !== undefined && cell !== null && cell !== "") // skip blanks
            .map((cell) =>
              String(cell)
              // .replace(/[\r\n]+/g, " ") // remove \r\n or \n
              // .replace(/\s+/g, " ") // collapse multiple spaces
              // .trim()
            )
        )
      );

      setData(uniqueLines);
      console.log(uniqueLines);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              {m.parts.map((part, index) => {
                switch (part.type) {
                  case 'text':
                    return <Streamdown isAnimating={status === 'streaming'} key={index}>{part.text}</Streamdown>;
                  case 'tool-addResource':
                  case 'tool-getInformation':
                    return (
                      <p>
                        call{part.state === 'output-available' ? 'ed' : 'ing'}{' '}
                        tool: {part.type}
                        <pre className="my-4 bg-zinc-100 p-2 rounded-sm">
                          {JSON.stringify(part.input, null, 2)}
                        </pre>
                      </p>
                    );
                }
              })}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          // sendMessage({ text: input, files });
          setInput('');
        }}
      >
        <textarea
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>

      <input
        type="file"
        onChange={handleFileUpload}
        accept=".xlsx, .xls"
      />
      <button onClick={sendResource}>IMPORT</button>
      <button onClick={() => router.push('/hehe')}>GO HEHE</button>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
        <defs>
          <linearGradient id="dropGrad" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stop-color="#5BE9FF" />
            <stop offset="50%" stop-color="#1A9FD4" />
            <stop offset="100%" stop-color="#0B5FA5" />
          </linearGradient>
          <radialGradient id="shineGrad" cx="35%" cy="28%" r="35%">
            <stop offset="0%" stop-color="white" stop-opacity="0.55" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0B5FA5" flood-opacity="0.35" />
          </filter>
          <filter id="micGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path d="M100 15 C100 15, 45 80, 45 135 C45 168 70 195 100 195 C130 195 155 168 155 135 C155 80 100 15 100 15 Z"
          fill="url(#dropGrad)" filter="url(#shadow)" />
        <path d="M100 15 C100 15, 45 80, 45 135 C45 168 70 195 100 195 C130 195 155 168 155 135 C155 80 100 15 100 15 Z"
          fill="url(#shineGrad)" />

        <circle cx="83" cy="138" r="7" fill="white" opacity="0.95" />
        <circle cx="117" cy="138" r="7" fill="white" opacity="0.95" />
        <circle cx="85" cy="139" r="4" fill="#0B5FA5" />
        <circle cx="119" cy="139" r="4" fill="#0B5FA5" />
        <circle cx="87" cy="137" r="1.5" fill="white" />
        <circle cx="121" cy="137" r="1.5" fill="white" />

        <path d="M85 158 Q100 172 115 158" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" />

        <path d="M58 115 Q100 55 142 115" stroke="#1a1a2e" stroke-width="5" fill="none" stroke-linecap="round" />

        <rect x="46" y="112" width="18" height="26" rx="8" fill="#1a1a2e" />
        <rect x="49" y="116" width="12" height="18" rx="5" fill="#2d2d5e" />
        <rect x="51" y="118" width="4" height="5" rx="2" fill="white" opacity="0.25" />

        <rect x="136" y="112" width="18" height="26" rx="8" fill="#1a1a2e" />
        <rect x="139" y="116" width="12" height="18" rx="5" fill="#2d2d5e" />
        <rect x="141" y="118" width="4" height="5" rx="2" fill="white" opacity="0.25" />

        <path d="M55 135 Q50 155 68 165" stroke="#1a1a2e" stroke-width="3.5" fill="none" stroke-linecap="round" />

        <rect x="62" y="162" width="14" height="20" rx="7" fill="#1a1a2e" filter="url(#micGlow)" />
        <rect x="65" y="165" width="8" height="14" rx="4" fill="#5BE9FF" opacity="0.85" />
        <line x1="65" y1="169" x2="73" y2="169" stroke="#1a1a2e" stroke-width="1" opacity="0.5" />
        <line x1="65" y1="173" x2="73" y2="173" stroke="#1a1a2e" stroke-width="1" opacity="0.5" />

        <g opacity="0.7">
          <path d="M79 168 Q83 172 79 178" stroke="#5BE9FF" stroke-width="2" fill="none" stroke-linecap="round" />
          <path d="M84 165 Q90 172 84 180" stroke="#5BE9FF" stroke-width="2" fill="none" stroke-linecap="round" />
        </g>
      </svg>

    </div>
  );
}