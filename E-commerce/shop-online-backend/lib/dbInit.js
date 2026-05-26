import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

import connectDB from "./dbConnect.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Review from "../models/Review.js";
import Deal from "../models/Deal.js"; // <-- Added

// Load environment variables
dotenv.config({ path: "../.env" });

// __dirname workaround for ES modules
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const insertSampleReviews = async () => {
  const users = await User.find();
  const products = await Product.find();

  if (users.length === 0 || products.length === 0) {
    console.warn("Skipping review insertion: users or products are missing");
    return;
  }

  const sampleReviews = [];
  for (let i = 0; i < 50; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    sampleReviews.push({
      userId: user._id,
      productId: product._id,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: "Nice product! " + (i + 1),
      createdAt: new Date(),
    });
  }

  await Review.insertMany(sampleReviews);
  console.log("Inserted 50 sample reviews");
};

const importData = async () => {
  try {
    await connectDB();

    /** ---------------- USERS ---------------- */
    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8"),
    );
    const filteredUsers = usersData.filter((u) => u.name); // changed from u.username to u.name
    if (filteredUsers.length !== usersData.length) {
      console.warn(
        `Skipped ${usersData.length - filteredUsers.length} users with missing names`,
      );
    }
    const existingUserEmails = new Set(
      (await User.find({}, "email")).map((u) => u.email),
    );
    const newUsers = await Promise.all(
      filteredUsers
        .filter((u) => !existingUserEmails.has(u.email))
        .map(async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
          return user;
        }),
    );
    if (newUsers.length > 0) {
      await User.insertMany(newUsers);
      console.log(`Inserted ${newUsers.length} new users`);
    } else {
      console.log("No new users to insert");
    }

    /** ---------------- PRODUCTS ---------------- */
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8"),
    );
    const existingProductNames = new Set(
      (await Product.find({}, "name")).map((p) => p.name),
    );
    const newProducts = productsData.filter(
      (p) => !existingProductNames.has(p.name),
    );
    if (newProducts.length > 0) {
      await Product.insertMany(newProducts);
      console.log(`Inserted ${newProducts.length} new products`);
    } else {
      console.log("No new products to insert");
    }

    /** ---------------- DEALS ---------------- */
    const dealsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/deals.json"), "utf-8"),
    );
    const existingDeals = new Set(
      (await Deal.find({}, "name")).map((d) => d.name),
    );
    const newDeals = dealsData.filter((deal) => !existingDeals.has(deal.name));
    if (newDeals.length > 0) {
      await Deal.insertMany(newDeals);
      console.log(`Inserted ${newDeals.length} new deals`);
    } else {
      console.log("No new deals to insert");
    }

    /** ---------------- REVIEWS ---------------- */
    await insertSampleReviews();

    console.log("Data import completed successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Import error:", error);
    process.exit(1);
  }
};

importData();
