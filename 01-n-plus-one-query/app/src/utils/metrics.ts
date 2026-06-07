import { prisma } from "../lib/prisma";

let queryCount = 0;

export const resetQueryCount = ()=> {
    queryCount = 0;
};

export const getQueryCount = ()=> {
    return queryCount;
}

prisma.$on("query", ()=>{
    queryCount++;
})