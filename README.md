Angular Admin Dashboard

A modern Admin Dashboard built with Angular featuring reusable components, charts, user management, and authentication.

Live Demo

Deployed on Vercel

https://admin-dashboard-delta-flax-65.vercel.app/
Features

Dashboard analytics with charts

User management (Add / Edit / Delete)

Reusable table component

Pagination and sorting

Search filter

Modal dialogs

Skeleton loading UI

Authentication with route guards

Responsive layout

Dark mode support

Tech Stack

Angular 21

RxJS

Tailwind CSS

Chart.js

TypeScript

Project Structure
src/
├── app/
│ ├── core/
│ │ ├── services/
│ │ ├── guards/
│ │ └── models/
│ ├── features/
│ │ ├── dashboard/
│ │ ├── users/
│ │ └── settings/
│ ├── shared/
│ │ ├── components/
│ │ │ ├── table
│ │ │ ├── card
│ │ │ ├── charts
│ │ │ ├── modal
│ │ │ └── skeleton
│ └── layout/
Installation

Clone the repository:

git clone https://github.com/yourusername/Admin-dashboard.git

Install dependencies:

npm install

Run the development server:

ng serve

Open:

http://localhost:4200
Build
ng build

Production build will be generated in:

dist/
Deployment

This project is deployed using Vercel.

Every push to GitHub automatically triggers a new deployment.

Future Improvements

Backend API integration

Role based access control

Advanced table filtering

Export users to CSV

Notifications system

Author

Praful Kusugal

Screenshots

(Add screenshots of dashboard here)
