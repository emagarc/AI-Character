import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";


import CharacterForm from "./components/CharacterForm";

interface CharacterIdPageProps {
    params: {
        characterId: string;
    };
};

const CharacterIdPage = async ({
    params
}: CharacterIdPageProps) => {
    const { userId } = auth();
    
    // TODO: Check Subscription

    if (!userId) {
        return redirectToSignIn();
    }

    const character = await prismadb.character.findUnique({
        where: {
            id: params.characterId,
            userId
        }
    });

    const categories = await prismadb.category.findMany();

  return (
    <div>
        <CharacterForm 
            initialData={character}
            categories={categories}
        />
    </div>
  )
}

export default CharacterIdPage;