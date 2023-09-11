import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import ChatClient from "../[chatId]/components/ChatClient";

interface ChatIdPageProps {
    params: {
        chatId: string;
    }
}

const ChatIdPage = async ({
    params
}: ChatIdPageProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    const character = await prismadb.character.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    if (!character) {
        return redirect("/")
    }

  return (
    <ChatClient character={character} />
  )
}

export default ChatIdPage;