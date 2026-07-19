import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import { queryMetrics } from "../../../../common/instrumentation/query-metrics";

const connectionString = `${process.env.DATABASE_URL}`;

console.log("Prisma Client Created");

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  log: [
    {
      emit: "event",
      level: "query",
    },
  ], //Enable Prisma query logging if wanted!
});

prisma.$on("query", (event) => {
  queryMetrics.increment();
  console.log("━━━━━━━━━━━━━━━━━━━━━━");
  console.log("SQL Query Executed");
  console.log("Duration:", event.duration, "ms");
  console.log("Total Queries:", queryMetrics.getCount());
  console.log(event.query);

  if (event.duration > 200) {
    console.warn("Slow Query");
  }
});

export { prisma };
