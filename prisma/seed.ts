import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
    const admin = await prisma.user.create({
        data: {
            name: "admin",
            password: "Password22",
            email: "admin@admin.com"
        }
    })

    const categories = await prisma.category.createMany({
        data: [
            {
                name: "Boneka",
            },
            {
                name: "Bantal",
            },
            {
                name: "Lainnya",
            }
        ]
    })
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })