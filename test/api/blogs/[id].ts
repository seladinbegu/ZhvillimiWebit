// tests/api/blogs/[id].test.ts
import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/blogs/[id]';
import * as BlogService from '@/api/services/Blog';

jest.mock('@/api/services/Blog');

describe('/api/blogs/[id] - Single Blog Route', () => {
  const blogId = '123';
  const mockBlog = { id: blogId, title: 'Test Blog' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test GET /api/blogs/:id
  it('should return 200 and blog data for GET request', async () => {
    (BlogService.getBlog as jest.Mock).mockResolvedValue(mockBlog);

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: blogId }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockBlog);
    expect(BlogService.getBlog).toHaveBeenCalledWith(blogId);
  });

  // Test PUT /api/blogs/:id
  it('should return 200 when updating a blog', async () => {
    const updatedData = { title: 'Updated Blog' };
    const updatedBlog = { ...mockBlog, ...updatedData };
    
    (BlogService.updateBlog as jest.Mock).mockResolvedValue(updatedBlog);

    const { req, res } = createMocks({
      method: 'PUT',
      query: { id: blogId },
      body: updatedData
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(updatedBlog);
    expect(BlogService.updateBlog).toHaveBeenCalledWith(blogId, updatedData);
  });

  // Test DELETE /api/blogs/:id
  it('should return 200 when deleting a blog', async () => {
    (BlogService.deleteBlog as jest.Mock).mockResolvedValue(true);

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: blogId }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(BlogService.deleteBlog).toHaveBeenCalledWith(blogId);
  });
});