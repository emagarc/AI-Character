"use client"

import { useCompletion } from "ai/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Character, Message } from "@prisma/client";

import ChatHeader from "@/components/ChatHeader";
import ChatForm from "@/components/ChatForm";
import ChatMessages from "@/components/ChatMessages";
import { ChatMessageProps } from "@/components/ChatMessage";

interface ChatClientProps {
    character: Character & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

const ChatClient = ({
    character
}: ChatClientProps) => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatMessageProps[]>(character.messages);

    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput,
    } = useCompletion({
        api: `/api/chat/${character.id}`,
        onFinish(prompt, completion) {
            const systemMessage: ChatMessageProps = {
                role: "system",
                content: completion,
            };

            setMessages((current) => [...current, systemMessage ]);
            setInput("");

            router.refresh();
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: ChatMessageProps = {
            role: "user",
            content: input,
        };

        setMessages((current) => [...current, userMessage]);

        handleSubmit(e);
    }

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
        <ChatHeader character={character}/>
        <ChatMessages 
            character={character}
            isLoading={isLoading}
            messages={messages}
        />
        <ChatForm 
            isLoading={isLoading}
            input={input}
            handleInputChange={handleInputChange}
            onSubmit={onSubmit}
        />
    </div>
  )
}

export default ChatClient;