'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { Streamdown } from 'streamdown';

export default function Chat() {

  const inputRef = useRef<any>(null);
  const messagesEndRef = useRef<any>(null);

  const [customer, setCustomer] = useState();
  const [input, setInput] = useState('');
  const [img, setImg] = useState<any>();

  // const { chat, setChat } = useChatStore();


  const { messages, sendMessage, status } = useChat({
    // messages: chat,
    // onFinish: (modelMessages) => {
    //   setChat(modelMessages.messages);
    // }
    transport: new DefaultChatTransport({
      fetch: async (url, options) => {
        const res = await fetch(url, options);
        if (res.status === 401) {
          signOut();
        }
        return res;
      },
    })
  });


  const isUser = (m: any) => m.role === 'user'
  const isBanned = messages.some(m => m.parts.some(p => p.type === 'tool-blockFlag'))


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user')
        const data = await res.json();
        setCustomer(data.data)
        inputRef.current.focus()
      } catch {
        signOut();
      }
    }
    fetchUser()
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = (e: any) => {
    e.preventDefault()
    if (!input && !img) return;
    sendMessage(
      { text: img ? (!!input ? input : 'Hình ảnh') : input },
      { body: { customer, image: img } }
    );
    setInput('');
    setImg(undefined);
  }


  // Function để lấy URI và base64 của ảnh
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);
    const imageUri = URL.createObjectURL(file).split('/').pop() || '';
    const extension = file.type === 'image/png' ? '.png' : '.jpeg';
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImg({
        hinh_anh: `file:///data/user/0/com.cnhp.appkhachhang/cache/ImagePicker/${imageUri}${extension}`,
        url_base64: base64String.split(',')[1] || base64String
      });
    };
    reader.readAsDataURL(file);
  };

  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4 max-sm:h-screen">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[700px] max-sm:h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center gap-3">
          <div
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
            onClick={() => signOut()}
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-lg">AI Assistant</h1>
            <p className="text-xs text-blue-100">Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2 items-start ${isUser(m) ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                  ${isUser(m)
                    ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                  }
                `}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isUser(m) ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  )}
                </svg>
              </div>
              <div
                className={`
                  ${isUser(m)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none'
                  } 
                  px-4 py-2 max-w-sm
                `}
              >
                {m.parts
                  .filter(i => i.type === 'text')
                  .map((part, i) => (
                    <Streamdown isAnimating={status === 'streaming'} key={i}>{part.text}</Streamdown>
                  ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`border-t border-gray-200 p-4 ${isBanned && 'pointer-events-none opacity-50'}`}>
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            {!!img ? (
              <button
                onClick={() => setImg(undefined)}
                className="bg-red-100 text-red-600 px-4 py-3 rounded-full hover:bg-red-200 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            ) : (
              <label
                htmlFor="image-upload"
                className="bg-gray-100 text-gray-700 px-4 py-3 rounded-full hover:bg-gray-200 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </label>
            )}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(e)
              }}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-px"
              disabled={!customer || isBanned}
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
            >
              {/* <span>Send</span> */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}