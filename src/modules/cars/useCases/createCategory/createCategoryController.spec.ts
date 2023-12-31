import request from "supertest"
import {app} from "../../../../app"

describe("Create Category Controller", async () => {
    it("should be able to create a new category", async () => { 
        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest",
        });

        expect(response.status).toBe(201);
    });
});