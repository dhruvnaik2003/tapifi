const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDb() {
  console.log('Deleting all users, links, and chips...');
  
  // Need to delete Links first due to foreign key constraints
  await prisma.link.deleteMany();
  
  // Need to delete Chips or unbind them
  await prisma.nfcChip.deleteMany();
  
  // Finally delete Users
  await prisma.user.deleteMany();

  console.log('All Dev Users deleted successfully.');
  
  // Seed the NfcChip with a valid Mock Emulator ID
  await prisma.nfcChip.create({
    data: {
      uid: 'mock-uid-emulator-123',
      status: 'unverified'
    }
  });

  console.log('Seeded a factory Mock UID for Simulator Testing: mock-uid-emulator-123');

}

resetDb()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
