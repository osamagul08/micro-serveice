import request from "supertest";
import { app } from "../../app";

it("fails when a email that does not exist is supplied", async () => {
  const response = await request(app).post("/api/users/signin").send({
    email: "test@test.com",
    password: "password",
  });

  expect(response.status).toBe(400);
});

it("fails when an incorrect password is supplied", async () => {
  // First create a user
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  // Then try to sign in with wrong password
  const response = await request(app).post("/api/users/signin").send({
    email: "test@test.com",
    password: "wrongpassword",
  });

  expect(response.status).toBe(400);
});

it("responds with a cookie when given valid credentials", async () => {
  console.log("Creating user for signin test");

  // First create a user
  const signupResponse = await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "password",
  });

  console.log("Signup response status:", signupResponse.status);
  console.log("Signup response body:", signupResponse.body);
  expect(signupResponse.status).toBe(201);

  console.log("Attempting signin");

  // Then sign in
  const signinResponse = await request(app).post("/api/users/signin").send({
    email: "test@test.com",
    password: "password",
  });

  console.log("Signin response status:", signinResponse.status);
  console.log("Signin response body:", signinResponse.body);

  if (signinResponse.status !== 200) {
    console.error("Signin failed unexpectedly");
  }

  expect(signinResponse.status).toBe(200);
  expect(signinResponse.get("Set-Cookie")).toBeDefined();
});
