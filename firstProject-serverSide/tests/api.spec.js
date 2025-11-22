import { test, expect } from '@playwright/test';

/**
 * בדיקות API לשרת ניהול נכסים
 */

test.describe('API Tests - בדיקות API', () => {
  
  test('בדיקת endpoint בסיסי - GET /', async ({ request }) => {
    const response = await request.get('/');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data).toHaveProperty('status');
    expect(data.status).toBe('Server is running');
  });

  test('בדיקת הרשמה - POST /api/auth/register', async ({ request }) => {
    const testUser = {
      name: 'בדיקה',
      email: `test${Date.now()}@example.com`,
      password: 'Test123456'
    };

    const response = await request.post('/api/auth/register', {
      data: testUser
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('user');
    expect(data.user.email).toBe(testUser.email);
  });

  test('בדיקת הרשמה עם אימייל קיים - אמור להיכשל', async ({ request }) => {
    const testUser = {
      name: 'בדיקה',
      email: 'duplicate@example.com',
      password: 'Test123456'
    };

    // רישום ראשון - אמור להצליח
    const firstResponse = await request.post('/api/auth/register', {
      data: testUser
    });
    expect(firstResponse.ok()).toBeTruthy();

    // רישום שני עם אותו אימייל - אמור להיכשל
    const secondResponse = await request.post('/api/auth/register', {
      data: testUser
    });
    expect(secondResponse.status()).toBe(400);
    
    const errorData = await secondResponse.json();
    expect(errorData).toHaveProperty('error');
  });

  test('בדיקת התחברות - POST /api/auth/login', async ({ request }) => {
    // קודם ניצור משתמש
    const testUser = {
      name: 'משתמש בדיקה',
      email: `login${Date.now()}@example.com`,
      password: 'Test123456'
    };

    await request.post('/api/auth/register', { data: testUser });

    // עכשיו ננסה להתחבר
    const loginResponse = await request.post('/api/auth/login', {
      data: {
        email: testUser.email,
        password: testUser.password
      }
    });

    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse.status()).toBe(200);
    
    const data = await loginResponse.json();
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('user');
  });

  test('בדיקת התחברות עם סיסמה שגויה - אמור להיכשל', async ({ request }) => {
    const testUser = {
      name: 'משתמש בדיקה',
      email: `wrongpass${Date.now()}@example.com`,
      password: 'Test123456'
    };

    await request.post('/api/auth/register', { data: testUser });

    const loginResponse = await request.post('/api/auth/login', {
      data: {
        email: testUser.email,
        password: 'WrongPassword123'
      }
    });

    expect(loginResponse.status()).toBe(401);
    const errorData = await loginResponse.json();
    expect(errorData).toHaveProperty('error');
  });

  test('בדיקת 404 - נתיב לא קיים', async ({ request }) => {
    const response = await request.get('/api/nonexistent');
    expect(response.status()).toBe(404);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });
});

