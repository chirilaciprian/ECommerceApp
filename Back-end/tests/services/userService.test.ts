import prisma from "../../src/config/database";
import * as userService from "../../src/services/userService";



describe("userService", () => {
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

  it("should create a user", async () => {
    const user = await userService.createUser({
      email: `test-${Date.now()}@gmail.com`,
      password: "password",
      username: `username-${Date.now()}`,
    });

    expect(user).toHaveProperty("id");
  });

  it("should get a user by id", async () => {
    const createdUser = await userService.createUser({
      email: `test-${Date.now()}@gmail.com`,
      password: "password",
      username: `username-${Date.now()}`,
    });
    const user = await userService.getUserById(createdUser.id);
    expect(user).not.toBeNull();
    expect(user?.id).toBe(createdUser.id);
  });

  it("should delete a user", async () => {
    const createdUser = await userService.createUser({
      email: `test-${Date.now()}@gmail.com`,
      password: "password",
      username: `username-${Date.now()}`,
    });
    const deletedUser = await userService.deleteUser(createdUser.id);
    expect(deletedUser).not.toBeNull();

    const user = await userService.getUserById(createdUser.id);
    expect(user).toBeNull();
  });

  it("should update a user", async () => {
    const createdUser = await userService.createUser({
      email: `test-${Date.now()}@gmail.com`,
      password: "password",
      username: `username-${Date.now()}`,
    });
    const updatedUser = await userService.updateUser(createdUser.id, {
      ...createdUser,
      email: `updated-${Date.now()}@gmail.com`,
      password: "password",
      username: `username-${Date.now()}`,
    });
    expect(updatedUser).not.toBeNull();
    
  });

  it("should get all users", async () => {
    await userService.createUser({
      email: `test1-${Date.now()}@gmail.com`,
      password: "password",
      username: `username1-${Date.now()}`,
    });
    await userService.createUser({
      email: `test2-${Date.now()}@gmail.com`,
      password: "password",
      username: `username2-${Date.now()}`,
    });

    const users = await userService.getAllUsers();
    expect(users).toHaveLength(2);
  });
});
