import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  console.log("Starting signup test");
  console.log("Environment variables:", {
    JWT_KEY: process.env.JWT_KEY,
    NODE_ENV: process.env.NODE_ENV,
    CI: process.env.CI,
  });

  const signupData = {
    email: "test@test.com",
    password: "password",
  };

  console.log("Signup data:", signupData);

  const response = await request(app)
    .post("/api/users/signup")
    .send(signupData);

  console.log("Response status:", response.status);
  console.log("Response body:", response.body);
  console.log("Response headers:", response.headers);

  if (response.status !== 201) {
    console.error("Signup failed with status:", response.status);
    console.error("Error body:", response.body);
  }

  expect(response.status).toBe(201);
});

it("sets a cookie after successful signup", async () => {
  console.log("Starting cookie test");

  const response = await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "password",
  });

  console.log("Cookie test - Response status:", response.status);
  console.log("Cookie test - Response body:", response.body);

  if (response.status !== 201) {
    console.error("Cookie test failed - Status:", response.status);
    console.error("Cookie test failed - Body:", response.body);
    // Don't fail here, let the expect handle it
  }

  expect(response.status).toBe(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});

it("disallows duplicate emails", async () => {
  const signupData = {
    email: "test@test.com",
    password: "password",
  };

  // First signup should succeed
  const firstResponse = await request(app)
    .post("/api/users/signup")
    .send(signupData);

  console.log("First signup status:", firstResponse.status);

  if (firstResponse.status !== 201) {
    console.error("First signup failed:", firstResponse.body);
  }

  expect(firstResponse.status).toBe(201);

  // Second signup should fail
  const secondResponse = await request(app)
    .post("/api/users/signup")
    .send(signupData);

  console.log("Second signup status:", secondResponse.status);
  console.log("Second signup body:", secondResponse.body);

  expect(secondResponse.status).toBe(400);
});
