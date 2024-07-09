import prisma from "../../src/config/database";
import * as productService from "../../src/services/productService";




let createdCategory: any;
describe("productService", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.$executeRaw`BEGIN`;
    createdCategory = await prisma.category.create({
      data: {
        name: `CategoryTest-${Date.now()}`, // Ensure unique category name
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });  

  afterEach(async () => {
    await prisma.$executeRaw`ROLLBACK`;
  });

  it("should create a product", async () => {
    const createdProduct = await productService.createProduct({
      name: "Sample product",
      price: 10,
      image: "imageUrl",
      categoryId: createdCategory.id,
    });
    expect(createdProduct).toHaveProperty("id");
    expect(createdProduct.name).toBe("Sample product");
    expect(createdProduct.price).toBe(10);
    expect(createdProduct.image).toBe("imageUrl");
    expect(createdProduct.categoryId).toBe(createdCategory.id);
  });

  it("should get all products", async () => {
    await productService.createProduct({
      name: "Sample product",
      price: 10,
      image: "imageUrl",
      categoryId: createdCategory.id,
    });

    await productService.createProduct({
      name: "Sample product 2",
      price: 20,
      image: "imageUrl",
      categoryId: createdCategory.id,
    });

    const products = await productService.getAllProducts();
    expect(products.length).toBe(2);
  });

  it("should get a product by id", async () => {
    const createdProduct = await productService.createProduct({
      name: "Sample product",
      price: 10,
      image: "imageUrl",
      categoryId: createdCategory.id,
    });

    const product = await productService.getProductById(createdProduct.id);
    expect(product).toHaveProperty("id");
    expect(product?.name).toBe("Sample product");
    expect(product?.price).toBe(10);
    expect(product?.image).toBe("imageUrl");
    expect(product?.categoryId).toBe(createdCategory.id);
  });

  it("should update a product", async () => {
    const createdProduct = await productService.createProduct({
      name: "Sample product",
      price: 10,
      image: "imageUrl",
      categoryId: createdCategory.id,
    });

    const updatedProduct = await productService.updateProduct(
      createdProduct.id,
      {
        name: "Updated product",
        price: 20,
        image: "updatedImageUrl",
        categoryId: createdCategory.id,
      }
    );

    expect(updatedProduct).toHaveProperty("id");
    expect(updatedProduct?.name).toBe("Updated product");
    expect(updatedProduct?.price).toBe(20);
    expect(updatedProduct?.image).toBe("updatedImageUrl");
    expect(updatedProduct?.categoryId).toBe(createdCategory.id);
  });

  it("should delete a product", async () => {
    const createdProduct = await productService.createProduct({
      name: "Sample product",
      price: 10,
      image: "imageUrl",
      categoryId: createdCategory.id,
    });

    const deletedProduct = await productService.deleteProduct(
      createdProduct.id
    );
    expect(deletedProduct).toHaveProperty("id");
    expect(deletedProduct?.name).toBe("Sample product");
    expect(deletedProduct?.price).toBe(10);
    expect(deletedProduct?.image).toBe("imageUrl");
    expect(deletedProduct?.categoryId).toBe(createdCategory.id);

    const product = await productService.getProductById(createdProduct.id);
    expect(product).toBeNull();
  });
});
