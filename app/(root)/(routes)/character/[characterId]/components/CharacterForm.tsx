"use client"

import { Category, Character } from "@prisma/client";

interface CharacterFormProps {
    initialData: Character | null;
    categories: Category[];
}

const CharacterForm = ({
    categories,
    initialData
}: CharacterFormProps) => {
  return (
    <div>CharacterForm</div>
  )
}

export default CharacterForm;