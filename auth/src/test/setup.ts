import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  var signin: () => Promise<any>;
}

let mongo: any = null;

beforeAll(async () => {
  process.env.JWT_KEY = "usamagul";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  let mongoUri: string;

  if (process.env.CI || process.env.MONGO_URL) {
    // Use MongoDB service in CI
    mongoUri = process.env.MONGO_URL || "mongodb://localhost:27017/test";
  } else {
    // Use MongoMemoryServer locally
    mongo = await MongoMemoryServer.create();
    mongoUri = mongo.getUri();
  }

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
