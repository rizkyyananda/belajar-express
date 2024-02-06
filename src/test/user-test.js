
import { web } from "../application/web.js";
import { logger } from "../application/logging.js";
import { prismaClient } from "../application/database.js";
import supertest from "supertest";

describe('POST /api/users', function(){

    afterEach(async () =>{
        await prismaClient.user.deleteMany({
            where:{
                username:"piliang"
            }
        });
    });

    it('should can register new user', async() =>{
        const result = await supertest(web)
            .post("/api/users")
            .send({
                username: 'piliang',
                password: 'Rahasia123',
                name: 'Rizky Yananda'
            });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("piliang");
        expect(result.body.data.name).toBe("Rizky Yananda");
        expect(result.body.data.password).toBeUndefined();

        // Reassigning 'result' would result in an error, so use a different variable
        const result2 = await supertest(web)
            .post("/api/users")
            .send({
                username: 'piliang',
                password: 'Rahasia123',
                name: 'Rizky Yananda'
            });

        logger.info(result2.body);

        expect(result2.status).toBe(400);
        expect(result2.body.errors).toBeUndefined();  // Fix typo here
    });
});
