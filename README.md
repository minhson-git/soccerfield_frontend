# soccerfield_frontend

Frontend Vue 3 cho hệ thống đặt sân bóng Soccer Field Manager, gồm ba luồng: người đặt sân, chủ sân và admin.

## Yêu cầu

- Node `^22.18.0` hoặc `>=24.12.0`
- pnpm 11

## Chạy dự án

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Backend mặc định chạy ở `http://localhost:8080`. Nếu backend chạy ở địa chỉ khác, tạo file `.env.local`:

```
VITE_API_BASE_URL=http://your-backend
```

## Lệnh thường dùng

| Lệnh | Mô tả |
|---|---|
| `pnpm build` | Kiểm tra type rồi build production |
| `pnpm test:unit` | Chạy unit test (Vitest) |
| `pnpm test:e2e` | Chạy E2E test (Playwright, desktop và mobile). Lần đầu cần chạy `npx playwright install` để tải trình duyệt |
| `pnpm lint` | Chạy lint, gồm cả luật kiến trúc |
| `pnpm api:generate` | Sinh API client từ OpenAPI của backend (backend phải đang chạy) |

Kiến trúc và quy ước của dự án được mô tả trong [CLAUDE.md](CLAUDE.md).
