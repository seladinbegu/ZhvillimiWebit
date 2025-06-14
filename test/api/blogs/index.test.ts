// tests/api/blogs/index.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/blogs/index';
import * as BlogService from '@/api/services/Blog';

jest.mock('@/api/services/Blog');

describe('/api/blogs - Index Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test GET /api/blogs
  it('should return 200 and list of blogs for GET request', async () => {
    const mockBlogs = [
      { id: '1', title: 'Test Blog 1' },
      { id: '2', title: 'Test Blog 2' }
    ];
    
    (BlogService.getBlogs as jest.Mock).mockResolvedValue(mockBlogs);

    const { req, res } = createMocks({
      method: 'GET'
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockBlogs);
    expect(BlogService.getBlogs).toHaveBeenCalledTimes(1);
  });

  // Test POST /api/blogs
  it('should return 201 when creating a new blog', async () => {
    const newBlog = { title: 'New Blog', content: 'Test content' };
    const createdBlog = { id: '3', ...newBlog };
    
    (BlogService.createBlog as jest.Mock).mockResolvedValue(createdBlog);

    const { req, res } = createMocks({
      method: 'POST',
      body: newBlog
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(createdBlog);
    expect(BlogService.createBlog).toHaveBeenCalledWith(newBlog);
  });

  // Test invalid method
  it('should return 405 for unsupported methods', async () => {
    const { req, res } = createMocks({
      method: 'PUT'
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});