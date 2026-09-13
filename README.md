# RentalFront

The frontend for RentalKing, a real-estate rental listing site. Built with React 19 and Vite, it lets visitors browse and filter property listings (by location, category, status, furnishing, BHK, price and area) and gives admins a dashboard to manage properties, projects, testimonials, and site contact details. It talks to the Rental-Backend API for all data.

## Setup

```bash
npm install
```

Create a `.env` file in the project root (optional — defaults to a backend on `localhost:5001` if omitted):

```
VITE_API_BASE_URL=http://localhost:5001/api
```

Start the dev server (runs on `http://localhost:3000`):

```bash
npm run dev
```

Other commands:

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # run ESLint
```

The Rental-Backend API must be running (see its README) for the app to load data.
