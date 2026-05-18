// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'node_modules/bcryptjs'

// const prisma = new PrismaClient()

// async function main() {
//   // hash password
//   const hashedPassword = await bcrypt.hash('25060523adminLDD@', 10)

//   // create user
//   const user = await prisma.user.create({
//     data: {
//       firstName: 'แอดมิน1',
//       userName: 'admin1',
//       password: hashedPassword,
//     },
//   })

//   console.log('Seeded user:', user)


// }

// // main()
// //   .catch((e) => {
// //     console.error(e)
// //     process.exit(1)
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect()
// //   })