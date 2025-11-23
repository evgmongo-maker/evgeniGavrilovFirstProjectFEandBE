import { test, expect } from '@playwright/test';

/**
 * API Tests
 * Modern TypeScript implementation with best practices
 * 
 * Tests the backend API endpoints for authentication and properties
 */

// Constants
const BASE_URL = 'http://localhost:5000';
const API_BASE = `${BASE_URL}/api`;

// Test data interfaces
interface TestUser {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

interface LoginResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

interface ErrorResponse {
  error: string;
  message?: string;
}

// Helper functions
const generateUniqueEmail = (prefix: string = 'test'): string => {
  return `${prefix}${Date.now()}${Math.random().toString(36).substring(7)}@example.com`;
};

const createTestUser = (name: string = 'Test User'): TestUser => ({
  name,
  email: generateUniqueEmail('test'),
  password: 'Test123456',
});

test.describe('API Tests', () => {
  
  test('should return server status on root endpoint', async ({ request }) => {
    // Act: Make GET request to root endpoint
    const response = await request.get(`${BASE_URL}/`);

    // Assert: Verify response status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Assert: Verify response body structure
    const data = await response.json() as { message: string; status: string };
    expect(data).toHaveProperty('message');
    expect(data).toHaveProperty('status');
    expect(data.status).toBe('Server is running');
  });

  test('should register new user successfully', async ({ request }) => {
    // Arrange: Create test user data
    const testUser: TestUser = createTestUser('בדיקה');

    // Act: Register new user
    const response = await request.post(`${API_BASE}/auth/register`, {
      data: testUser,
    });

    // Assert: Verify registration success
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const data = await response.json() as RegisterResponse;
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('user');
    expect(data.user.email).toBe(testUser.email);
    expect(data.user.name).toBe(testUser.name);
    expect(typeof data.token).toBe('string');
    expect(data.token.length).toBeGreaterThan(0);
  });

  test('should fail to register user with duplicate email', async ({ request }) => {
    // Arrange: Create test user
    const testUser: TestUser = {
      name: 'בדיקה',
      email: `duplicate${Date.now()}@example.com`,
      password: 'Test123456',
    };

    // Act: Register user first time
    const firstResponse = await request.post(`${API_BASE}/auth/register`, {
      data: testUser,
    });
    expect(firstResponse.ok()).toBeTruthy();

    // Act: Attempt to register with same email
    const secondResponse = await request.post(`${API_BASE}/auth/register`, {
      data: testUser,
    });

    // Assert: Verify duplicate registration fails
    expect(secondResponse.status()).toBe(400);
    
    const errorData = await secondResponse.json() as ErrorResponse;
    expect(errorData).toHaveProperty('error');
  });

  test('should login user with correct credentials', async ({ request }) => {
    // Arrange: Register a test user
    const testUser: TestUser = createTestUser('משתמש בדיקה');
    await request.post(`${API_BASE}/auth/register`, { data: testUser });

    // Act: Login with correct credentials
    const loginResponse = await request.post(`${API_BASE}/auth/login`, {
      data: {
        email: testUser.email,
        password: testUser.password,
      },
    });

    // Assert: Verify login success
    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse.status()).toBe(200);
    
    const data = await loginResponse.json() as LoginResponse;
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('user');
    expect(data.user.email).toBe(testUser.email);
  });

  test('should fail to login with incorrect password', async ({ request }) => {
    // Arrange: Register a test user
    const testUser: TestUser = createTestUser('משתמש בדיקה');
    await request.post(`${API_BASE}/auth/register`, { data: testUser });

    // Act: Attempt login with wrong password
    const loginResponse = await request.post(`${API_BASE}/auth/login`, {
      data: {
        email: testUser.email,
        password: 'WrongPassword123',
      },
    });

    // Assert: Verify login failure
    expect(loginResponse.status()).toBe(401);
    
    const errorData = await loginResponse.json() as ErrorResponse;
    expect(errorData).toHaveProperty('error');
  });

  test('should return 404 for non-existent endpoint', async ({ request }) => {
    // Act: Request non-existent endpoint
    const response = await request.get(`${API_BASE}/nonexistent`);

    // Assert: Verify 404 response
    expect(response.status()).toBe(404);
    
    const data = await response.json() as ErrorResponse;
    expect(data).toHaveProperty('error');
  });
});

