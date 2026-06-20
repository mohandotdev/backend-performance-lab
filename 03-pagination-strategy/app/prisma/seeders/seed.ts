import {prisma} from "../../src/lib/prisma";
import { faker } from "@faker-js/faker";

const TENANTS = 10;
const USERS_PER_TENANT = 20;
const CONTRACTS_PER_TENANT = 100000;
// const APPROVALS_PER_CONTRACT = 0;
// const COMMENTS_PER_CONTRACT = 0;
const BATCH_SIZE = 5000;

async function main() {
  console.log("Cleaning database...");

  await prisma.approval.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  console.log("Seeding started...");

  for (let tenantIndex = 1; tenantIndex <= TENANTS; tenantIndex++) {
    console.log(`\nCreating Tenant ${tenantIndex}/${TENANTS}`);

    const tenant = await prisma.tenant.create({
      data: {
        name: `Tenant-${tenantIndex}`,
      },
    });

    // --------------------------------------------------
    // USERS
    // --------------------------------------------------

    const usersData = Array.from(
      { length: USERS_PER_TENANT },
      (_, userIndex) => ({
        tenantId: tenant.id,
        name: faker.person.fullName(),
        email: `tenant${tenant.id}_user${userIndex}@lab.com`,
      })
    );

    await prisma.user.createMany({
      data: usersData,
    });

    const users = await prisma.user.findMany({
      where: {
        tenantId: tenant.id,
      },
      select: {
        id: true,
      },
    });

    // --------------------------------------------------
    // CONTRACTS
    // --------------------------------------------------

    for(let offset = 0; offset < CONTRACTS_PER_TENANT; offset+=BATCH_SIZE){
      const contractsData = Array.from(
        { length: Math.min(BATCH_SIZE, CONTRACTS_PER_TENANT - offset) },
        () => ({
          tenantId: tenant.id,
          createdById:
            users[Math.floor(Math.random() * users.length)].id,
          name: faker.company.name() + " Agreement",
          status: faker.helpers.arrayElement([
            "DRAFT",
            "PENDING",
            "APPROVED",
            "REJECTED",
          ]),
        })
      );

      await prisma.contract.createMany({
        data: contractsData,
      });

      console.log(
        `Tenant ${tenant.id}: ${offset + contractsData.length}/${CONTRACTS_PER_TENANT}`
      );
    }

    // --------------------------------------------------
    // APPROVALS
    // --------------------------------------------------

    // const approvalsData: any[] = [];

    // for (const contract of contracts) {
    //   for (let i = 0; i < APPROVALS_PER_CONTRACT; i++) {
    //     approvalsData.push({
    //       contractId: contract.id,
    //       approverId:
    //         users[Math.floor(Math.random() * users.length)].id,
    //       status: faker.helpers.arrayElement([
    //         "PENDING",
    //         "APPROVED",
    //         "REJECTED",
    //       ]),
    //     });
    //   }
    // }

    // await prisma.approval.createMany({
    //   data: approvalsData,
    // });

    // --------------------------------------------------
    // COMMENTS
    // --------------------------------------------------

    // const commentsData: any[] = [];

    // for (const contract of contracts) {
    //   for (let i = 0; i < COMMENTS_PER_CONTRACT; i++) {
    //     commentsData.push({
    //       contractId: contract.id,
    //       message: faker.lorem.sentence(),
    //     });
    //   }
    // }

    // await prisma.comment.createMany({
    //   data: commentsData,
    // });

    // console.log(
    //   `Tenant ${tenant.id} seeded with ${contracts.length} contracts`
    // );
  }

  console.log("\n Seeding completed!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });