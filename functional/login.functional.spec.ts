import { test, expect } from "@playwright/test";
test('it should redirect to dashboard on successful login', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    await route.fulfill({ status: 200 })
  })

  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', '12345');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:4200/dashboard');
})

test('it should show an error when login fails', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    await route.fulfill({ status: 401, body: JSON.stringify({ message: 'Invalid email or password'})})
  })

  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'wrongPassword');
  await page.click('button[type="submit"]');

  const errorMessage = page.locator('text=Invalid email or password');
  await expect(errorMessage).toBeVisible();
})
