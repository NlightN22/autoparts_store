import {Prisma} from "@prisma/client";

export const handleDbErrors = (e: Error, data: any) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
            console.log(`There is a unique constraint violation of ${JSON.stringify(data)} at ${JSON.stringify(e.meta)}`)
        }else {
            console.error(e)
        }
    } else {
        return e
    }
}