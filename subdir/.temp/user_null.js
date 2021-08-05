const Prisma = require('@prisma/client')

const prisma = new Prisma.PrismaClient()

console.log(
    prisma.project.findMany().then((res) => {
        console.log(res)
        prisma.$disconnect()
    })
)