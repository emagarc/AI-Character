const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Science Fiction" },
                { name: "Fantasy" },
                { name: "Romance" },
                { name: "Mystery and Suspense" },
                { name: "Horror" },
                { name: "Realism" },
                { name: "Science" },
                { name: "Philosophy" },
                { name: "Humor" },
                { name: "Historical" },
                { name: "Drama" },
                { name: "Poetry" },
            ]
        })
    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
}

main();