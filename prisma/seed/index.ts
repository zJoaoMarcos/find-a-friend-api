import { PrismaClient } from '@prisma/client'
import { organizationSeed } from './organization.seed'
import { petSeed } from './pet.seed'

const prisma = new PrismaClient()

async function main() {
  // Organizations

  try {
    organizationSeed.forEach(async (org) => {
      await prisma.organization.upsert({
        where: { email: org.email },
        update: {},
        create: {
          ...org,
        },
      })
    })

    petSeed.forEach(async (pet) => {
      await prisma.pet.upsert({
        where: { id: pet.id },
        update: {},
        create: {
          ...pet,
        },
      })
    })
  } catch (error) {
    console.log(error)
  }
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
