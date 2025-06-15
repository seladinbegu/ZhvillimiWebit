// tests/api/user.test.ts
import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/user/profile";
import * as UserService from "@/api/services/User";

jest.mock("@/api/services/User");

describe("GET /api/user handler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 405 if method is not GET", async () => {
    const { req, res } = createMocks({ method: "POST" });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: "Method Not Allowed" });
  });

  it("returns 400 if email query param missing", async () => {
    const { req, res } = createMocks({ method: "GET", query: {} });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: "Missing email parameter" });
  });

  it("returns 404 if user not found", async () => {
    (UserService.getUser as jest.Mock).mockResolvedValue(null);

    const { req, res } = createMocks({
      method: "GET",
      query: { email: "notfound@example.com" },
    });

    await handler(req, res);

    expect(UserService.getUser).toHaveBeenCalledWith("notfound@example.com");
    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toEqual({ message: "User not found" });
  });

  it("returns 200 and user data if found", async () => {
    const fakeUser = {
      _id: { toString: () => "abc123" },
      name: "John Doe",
      email: "john@example.com",
    };
    (UserService.getUser as jest.Mock).mockResolvedValue(fakeUser);

    const { req, res } = createMocks({
      method: "GET",
      query: { email: "john@example.com" },
    });

    await handler(req, res);

    expect(UserService.getUser).toHaveBeenCalledWith("john@example.com");
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      userId: "abc123",
      name: "John Doe",
      email: "john@example.com",
    });
  });

  it("returns 500 if getUser throws", async () => {
    (UserService.getUser as jest.Mock).mockRejectedValue(new Error("fail"));

    const { req, res } = createMocks({
      method: "GET",
      query: { email: "error@example.com" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: "Internal Server Error" });
  });
});