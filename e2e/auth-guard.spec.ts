import { expect, test } from '@playwright/test'

test('guest opening an owner page is sent to login', async ({ page }) => {
  await page.goto('/owner/fields')

  await expect(page).toHaveURL((url) => {
    return url.pathname === '/login' && url.searchParams.get('redirect') === '/owner/fields'
  })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})
