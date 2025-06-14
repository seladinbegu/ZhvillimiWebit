import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/user/profile';
import { getUser } from '@/api/services/User';

// Mock user service
jest.mock('@/api/services/User', () => ({
  getUser: jest.fn(),
}));

const mockUser = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Test User',
  email: 'test@example.com',
};

describe('/api/users/profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('kthen të dhënat e përdoruesit për email të vlefshme', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);

    const { req, res } = createMocks({
      method: 'GET',
      query: { email: 'test@example.com' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      id: mockUser._id,
      name: mockUser.name,
      email: mockUser.email,
    });
    expect(getUser).toHaveBeenCalledWith('test@example.com');
  });

  it('kthen 400 kur mungon email', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {}, // No email provided
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Missing email parameter',
    });
  });

  it('kthen 404 kur përdoruesi nuk ekziston', async () => {
    (getUser as jest.Mock).mockResolvedValue(null);

    const { req, res } = createMocks({
      method: 'GET',
      query: { email: 'nonexistent@example.com' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'User not found',
    });
  });

  it('kthen 405 për metodat jo-GET', async () => {
    const { req, res } = createMocks({
      method: 'POST', // Invalid method
      query: { email: 'test@example.com' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method Not Allowed',
    });
  });

  it('kthen 500 kur shfaqet gabim në server', async () => {
    (getUser as jest.Mock).mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'GET',
      query: { email: 'test@example.com' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Internal Server Error',
    });
  });
});