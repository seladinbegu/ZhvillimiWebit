import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/blogs";
import * as BlogService from "@/api/services/Blog";

jest.mock("@/api/services/Blog");

describe("/api/blogs handler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET returns blogs", async () => {
    const mockBlogs = [{ id: 1, title: "Test blog" }];
    (BlogService.getBlogs as jest.Mock).mockResolvedValue(mockBlogs);

    const { req, res } = createMocks({ method: "GET" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(mockBlogs);
  });

  test("POST creates a blog", async () => {
    const newBlog = { title: "New Blog" };
    const createdBlog = { id: 2, ...newBlog };
    (BlogService.createBlog as jest.Mock).mockResolvedValue(createdBlog);

    const { req, res } = createMocks({
      method: "POST",
      body: newBlog,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual(createdBlog);
  });

  test("Unsupported method returns 405", async () => {
    const { req, res } = createMocks({ method: "PUT" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: "Method not allowed" });
  });
});