import prismadb from "@/lib/prismadb";

import CharacterForm from "./components/CharacterForm";

interface CharacterIdPageProps {
    params: {
        characterId: string;
    };
};

const CharacterIdPage = async ({
    params
}: CharacterIdPageProps) => {
    
    // TODO: Check Subscription

    const character = await prismadb.character.findUnique({
        where: {
            id: params.characterId,
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