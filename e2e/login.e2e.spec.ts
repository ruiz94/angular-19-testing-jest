import { expect, test } from '@playwright/test';

test('Complete login flow', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    const requestBody = route.request().postDataJSON();

    if(requestBody.email === 'user@example.com' && requestBody.password === '12345'){
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true })
      })
    } else {
      route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Invalid email or password'})
      })
    }
  })

  //iniciar sesión
  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', '12345');
  await page.click('button[type="submit"]');

  // verificar la re-dirección
  await expect(page).toHaveURL('http://localhost:4200/dashboard');
})

test('Complete login flow but fails', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    const requestBody = route.request().postDataJSON();

    if(requestBody.email === 'user@example.com' && requestBody.password === '12345'){
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true })
      })
    } else {
      route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Invalid email or password'})
      })
    }
  })

  //iniciar sesión
  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'wrongPassword');
  await page.click('button[type="submit"]');

  // verificar mensaje de error
  const errorMessage = page.locator('text=Invalid email or password');
  await expect(errorMessage).toBeVisible();
})
