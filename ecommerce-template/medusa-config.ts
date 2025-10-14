import { loadEnv, defineConfig } from "@medusajs/framework/utils";
import path from "node:path";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    redisUrl: process.env.REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions: {
      ssl: false,
      sslMode: "disable",
    },
  },
  admin: {
    // vite: (config) => ({
    //   ...config,
    //   resolve: {
    //     ...config.resolve,
    //     alias: [
    //       {
    //         find: "@medusajs/dashboard/css",
    //         replacement: path.resolve(process.cwd(), "node_modules/@medusajs/dashboard/dist/app.css"),
    //       },
    //       {
    //         find: "@medusajs/dashboard",
    //         replacement: path.resolve(process.cwd(), "node_modules/@medusajs/dashboard/dist/app.mjs"),
    //       },
    //       {
    //         find: "@medusajs/draft-order/admin",
    //         replacement: path.resolve(process.cwd(), "node_modules/@medusajs/draft-order/.medusa/server/src/admin/index.mjs"),
    //       }
    //     ]
    //   }
    // }),
  },
});
