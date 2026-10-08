# CLAUDE.md

This file guides Claude Code when working in `soccerfield_frontend`.

## Overview

React 18 frontend for the Soccer Field Manager system (soccer field booking and management). It talks to a Spring Boot backend in `../soccerfield_backend`, which runs at `http://localhost:8080` by default. The project was bootstrapped with Create React App (`react-scripts` 5).

## Commands

```bash
npm install      # install dependencies
npm start        # dev server at http://localhost:3000
npm run build    # production build into build/
npm test         # Jest + React Testing Library (watch mode)
```

## Environment

- `.env` holds `REACT_APP_BASE_URL`, the backend URL. Every CRA env var must start with `REACT_APP_`, and the dev server must be restarted after `.env` changes.
- Do not commit secrets in `.env`.

## Structure

```
src/
├── api/axiosConfig.js        # shared axios instance (currently unused by components)
├── components/
│   ├── routes/AppRoutes.js   # ALL routes are declared here (createBrowserRouter)
│   ├── Login.js              # login, stores token in sessionStorage
│   ├── PageNotFound.js
│   ├── admin/                # admin dashboard (Ant Design)
│   │   ├── layout/Layout.js  # admin layout: Sidebar + <Outlet/>
│   │   ├── home/Header.js    # admin sidebar menu
│   │   ├── global/           # shared parts: ActionButtons, SearchButton, SearchInput, Spinner
│   │   └── pages/<entity>/   # Branch, field, booking, user, role
│   │       ├── <Entity>.js   # list page: Table + filters + Pagination
│   │       └── modal/        # ModalCreate<Entity>, ModalUpdate<Entity>
│   ├── renter/               # pages for renters (bookers): header, footer, hero, booking, booking_form, historybooking, profile
│   ├── branch_manager/       # Signup
│   └── utils/imageSelector.js
├── pages/                    # older pages; only BookingField.js is still used in the routes
└── assets/images/
```

## Routes (`src/components/routes/AppRoutes.js`)

- `/` Hero, `/login`, `/signup`, `*` NotFound
- `/admin/*`, under `LayoutAdmin`: `branchs`, `fields`, `bookings`, `users`, `roles`
- `/user/home`, `/user/booking/field/:fieldId`, `/user/booking/field/:id/book`, `/user/history`, `/user/profile`. Renter pages wrap the component in `<Header/>` + `<Footer/>` by hand inside the route element.

When you add an admin page, also update the page title in `getPageName()` in `admin/layout/Layout.js` and the menu in `admin/home/Header.js`.

## Conventions

- **UI**: admin pages use **Ant Design** (`Table`, `Modal`, `Form`, `notification`, `Select`, `Pagination`). Renter pages mostly use plain CSS (a `.css` file next to each component) plus Bootstrap/MUI. There is no Tailwind. Follow whatever library the surrounding area already uses.
- **API calls**: components call `axios` directly, with the backend URL taken from the environment:
  ```js
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const jwtToken = sessionStorage.getItem("access_token");
  const res = await axios.get(`${BaseUrl}/fields`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
    params,
  });
  ```
- **Response shape** from the backend: `res.data.data` holds the payload and `res.data.message` holds the message. Paginated lists use `page`/`size` params, and the UI keeps `meta = { current, pageSize, pages, total }`.
- **Auth**: there is no context or Redux. After login, `access_token`, `username` and `userId` are stored in `sessionStorage`. Users with `role === "admin"` go to `/admin/branchs`; everyone else goes to `/user/home`. There is no route guard yet.
- **Notifications**: use antd `notification.success` / `notification.error`.
- Components are function components with hooks, the files are `.js` (JSX in `.js`, no TypeScript), and each file has a default export.
- Comments are often written in Vietnamese. Keep that style when editing existing code.

## Pitfalls

- **Inconsistent folder name casing**: `admin/pages/Branch` is capitalized while `field`, `booking`, `user` and `role` are lowercase. `AppRoutes.js` imports `../admin/pages/Field/Field`, but the folder is `field`. This works on Windows, but the build will fail on Linux/CI because paths are case-sensitive. Match the real casing in new imports.
- `Login.js` hardcodes `http://localhost:8080/auth/login` instead of using `REACT_APP_BASE_URL`.
- `src/App.js` contains a large block of old commented-out code. The real entry point is `AppRouter`.
- The route is spelled `branchs` (not `branches`). Keep it that way so it stays in sync with the backend and the menu.
