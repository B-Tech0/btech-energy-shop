import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getAllProducts, getProductsByCategory, searchProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    all: publicProcedure.query(async () => {
      return getAllProducts();
    }),
    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return getProductsByCategory(input.category);
      }),
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return searchProducts(input.query);
      }),
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getProductById(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        brand: z.string().min(1),
        category: z.enum(["Panels", "Inverters", "Batteries", "CCTV", "Accessories"]),
        price: z.number().int().positive(),
        description: z.string().optional(),
        image: z.string().optional(),
        specs: z.string().optional(),
        inStock: z.number().int().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can create products" });
        }
        return createProduct(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        brand: z.string().min(1).optional(),
        category: z.enum(["Panels", "Inverters", "Batteries", "CCTV", "Accessories"]).optional(),
        price: z.number().int().positive().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        specs: z.string().optional(),
        inStock: z.number().int().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can update products" });
        }
        const { id, ...data } = input;
        return updateProduct(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can delete products" });
        }
        return deleteProduct(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
