import request from "supertest";
import app from "../../../app.js";

describe("Try login with empty fields", () => {
  test("It should response with status code 403 and return message = Invalid request", () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "",
        password: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try login using admin", () => {
  test("It should response status code 200 and return message and user data", () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "sysadmin1",
        password: "password123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Login successfull");
      });
  });
});

describe("Try login using email", () => {
  test("It should response status code 200 and return message and user data", () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "sysadmin@gmail.com",
        password: "password123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Login successfull");
      });
  });
});

describe("Try login using email, false password", () => {
  test("It should response status code 401 and return message and user data", () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "sysadmin@gmail.com",
        password: "password",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual("Login unsuccessfull");
        expect(response.body.error).toEqual("Invalid credential");
      });
  });
});
