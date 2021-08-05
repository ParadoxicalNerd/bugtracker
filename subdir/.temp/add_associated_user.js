const Prisma = require('@prisma/client')

const prisma = new Prisma.PrismaClient()

const main = async () => {
    const projectID = "39f04286-8d53-42ab-bb25-adce425eb4b2"
    const associatedUserID = "bdd134f8-2a38-4b71-9112-6081cb39908c"

    const project = await prisma.project.findUnique({
        where: {
            id: projectID
        }, include: {
            associatedUsers: true
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: associatedUserID
        }
    })

    if (!project || !user) return undefined

    console.log(await prisma.project.update({
        where: {
            id: projectID
        },
        data: {
            associatedUsers: {
                connect: [{
                    id: user.id
                }]
            }
        }
    }))
}
main()