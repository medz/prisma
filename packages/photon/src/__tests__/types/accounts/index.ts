import { PrismaClient, RandomModel, AccountData } from '@prisma/client'

// tslint:disable

// This file will not be executed, just compiled to check if the typings are valid
async function main() {
  const prisma = new PrismaClient()

  const globalConfig: {
    accounts: {
      id: string
    }[]
  } | null = await prisma.globalConfigurations.findOne({
    where: {
      id: '',
    },
    select: {
      accounts: {
        select: {
          id: true,
        },
      },
    },
  })

  const userTest: {
    id: string
    globalConfiguration: {
      accounts: {
        config: {
          list: RandomModel[]
          data: AccountData | null
        }
      }[]
    }
  } | null = await prisma.userTests.findOne({
    where: {
      id: 'Example',
    },
    select: {
      id: true,
      globalConfiguration: {
        select: {
          accounts: {
            select: {
              config: {
                select: {
                  list: true,
                  data: true,
                },
              },
            },
          },
        },
      },
    },
  })

  const x = await prisma.userTests.findMany({
    where: {
      role: {
        equals: 'ADMIN',
      },
    },
  })
}

main().catch(e => {
  console.error(e)
})
