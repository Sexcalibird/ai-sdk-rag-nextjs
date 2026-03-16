import { create } from "zustand";
import type { UIDataTypes, UIMessage, UITools } from "ai";

interface ChatStore {
    chat: UIMessage<unknown, UIDataTypes, UITools>[];
    setChat: (messages: UIMessage<unknown, UIDataTypes, UITools>[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    chat: [],
    setChat: (chat) => set({ chat }),
}));