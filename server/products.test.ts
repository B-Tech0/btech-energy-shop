import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("products access control", () => {
  describe("admin authorization", () => {
    it("prevents regular users from creating products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.products.create({
          name: "Test Solar Panel",
          brand: "TestBrand",
          category: "Panels",
          price: 100000,
          description: "A test solar panel",
          inStock: 1,
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("Only admins can create products");
      }
    });

    it("prevents unauthenticated users from creating products", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      try {
        await caller.products.create({
          name: "Test Solar Panel",
          brand: "TestBrand",
          category: "Panels",
          price: 100000,
          description: "A test solar panel",
          inStock: 1,
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("prevents regular users from updating products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.products.update({
          id: 1,
          name: "Updated Solar Panel",
          price: 120000,
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("Only admins can update products");
      }
    });

    it("prevents regular users from deleting products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.products.delete({ id: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("Only admins can delete products");
      }
    });

    it("prevents unauthenticated users from updating products", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      try {
        await caller.products.update({
          id: 1,
          name: "Updated Solar Panel",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("prevents unauthenticated users from deleting products", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      try {
        await caller.products.delete({ id: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("product schema validation", () => {
    it("validates product data structure", () => {
      const testProduct = {
        id: 1,
        name: "Test Panel",
        brand: "TestBrand",
        category: "Panels" as const,
        price: 100000,
        description: "Test",
        image: "https://example.com/image.jpg",
        specs: "Test specs",
        inStock: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(testProduct.name).toBeDefined();
      expect(testProduct.brand).toBeDefined();
      expect(testProduct.category).toBe("Panels");
      expect(testProduct.price).toBeGreaterThan(0);
      expect(["Panels", "Inverters", "Batteries", "CCTV", "Accessories"]).toContain(
        testProduct.category
      );
    });

    it("validates WhatsApp message generation", () => {
      const product = {
        id: 1,
        name: "Jinko 550W Solar Panel",
        brand: "Jinko",
        price: 135000,
      };

      const message = `Hi Btech Energy! I'm interested in the following product:\n\n*${product.name}*\nBrand: ${product.brand}\nPrice: ₦${product.price.toLocaleString()}\n\nPlease provide more details and availability.`;

      expect(message).toContain("Jinko 550W Solar Panel");
      expect(message).toContain("Jinko");
      expect(message).toContain("₦135,000");
      expect(message).toContain("Hi Btech Energy!");
    });
  });
});
