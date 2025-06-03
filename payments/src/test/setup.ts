import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  var signin: () => Promise<any>;
}

let mongo: any = null;

const connectWithRetry = async (mongoUri: string, maxRetries = 10) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      console.log(`MongoDB connection attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

beforeAll(async () => {
  process.env.JWT_KEY = "usamagul";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  let mongoUri: string;

  if (process.env.CI || process.env.MONGO_URL) {
    mongoUri = process.env.MONGO_URL || "mongodb://localhost:27017/test";
    console.log("Using CI MongoDB:", mongoUri);
  } else {
    mongo = await MongoMemoryServer.create();
    mongoUri = mongo.getUri();
    console.log("Using MongoMemoryServer:", mongoUri);
  }

  await connectWithRetry(mongoUri);
}, 30000);

beforeEach(async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connection.asPromise();
  }

  try {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
    console.log("Collections cleared successfully");
  } catch (clearError) {
    console.error("Error clearing collections:", clearError);
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test_global@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie || [];
};
