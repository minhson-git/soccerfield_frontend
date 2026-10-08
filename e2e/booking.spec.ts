import { expect, test, type Page } from '@playwright/test'

async function pickFirstFreeSlot(page: Page) {
  await page
    .getByRole('group', { name: 'Giờ bắt đầu' })
    .getByRole('button', { disabled: false })
    .first()
    .click()
}

test.describe('desktop booking page', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('guest picking a slot is asked to log in, then sent back to the same selection', async ({
    page,
  }) => {
    await page.goto('/branches/1')
    await page.getByRole('button', { name: '60 phút' }).click()
    await pickFirstFreeSlot(page)

    await expect(page).toHaveURL((url) => url.searchParams.has('slot'))
    await page.getByRole('button', { name: 'Giữ chỗ ngay' }).click()

    await expect(page).toHaveURL((url) => {
      const redirect = url.searchParams.get('redirect') ?? ''
      return (
        url.pathname === '/login' &&
        redirect.startsWith('/branches/1?') &&
        redirect.includes('slot=')
      )
    })
  })
})

test.describe('mobile booking page', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('bottom bar opens the sheet with duration and extras', async ({ page }) => {
    await page.goto('/branches/1')
    // Immersive on mobile: no app header
    await expect(page.getByRole('navigation', { name: 'Điều hướng chính' })).toHaveCount(0)

    await pickFirstFreeSlot(page)
    await page.getByRole('button', { name: 'Đặt ngay' }).click()

    const sheet = page.getByRole('dialog', { name: 'Hoàn tất đặt sân' })
    await expect(sheet).toBeVisible()
    await expect(sheet.getByRole('group', { name: 'Thời lượng' })).toBeVisible()
    await expect(sheet.getByText('Thêm dịch vụ')).toBeVisible()
  })
})
