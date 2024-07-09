import prisma from "../../src/config/database";
import * as categoryService from "../../src/services/categoryService";
import cuid from "cuid";



describe("categoryService", () => {

    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        await prisma.$executeRaw`BEGIN`;
    });
    
    afterEach(async () => {
        await prisma.$executeRaw`ROLLBACK`;
    });

    it("should create a category", async () => {
        const createdCategory = await categoryService.createCategory({
            name: "Samplecategory",
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        expect(createdCategory).toHaveProperty("id");
        expect(createdCategory.name).toBe("Samplecategory");
    });

    it("should get all categories", async () => {
        await categoryService.createCategory({
            name: "Samplecategory",
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await categoryService.createCategory({
            name: "Samplecategory2",
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const categories = await categoryService.getAllCategories();
        expect(categories.length).toBe(2);
    });

    it("should get a category by id", async () => {
        const createdCategory = await categoryService.createCategory({
            name: "Samplecategory",
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const category = await categoryService.getCategoryById(createdCategory.id);
        expect(category).not.toBeNull();
        expect(category?.id).toBe(createdCategory.id);
    });

    it("should update a category", async () => {
        const createdCategory = await categoryService.createCategory({
            name: "Samplecategory",
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const updatedCategory = await categoryService.updateCategory(createdCategory.id, {
            name: "Updatedcategory",
            id: createdCategory.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        expect(updatedCategory).not.toBeNull();
        expect(updatedCategory?.name).toBe("Updatedcategory");
    });

    it("should delete a category", async () => {
        const createdCategory = await categoryService.createCategory({
            name: "Samplecategory3",
            id: cuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const deletedCategory = await categoryService.deleteCategory(createdCategory.id);
        expect(deletedCategory).not.toBeNull();
        const category = await categoryService.getCategoryById(createdCategory.id);
        expect(category).toBeNull();
    });
    

});
