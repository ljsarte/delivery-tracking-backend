# Last-Mile Delivery Tracking System — Backend

ITEC 116 Final Project (Systems Integration and Architecture 2).
A NestJS + TypeORM + MySQL backend that lets customers place delivery
orders, dispatchers assign riders, and everyone track delivery status
and live GPS location in real time.

## Tech Stack

| Component      | Technology |
|-----------------|------------|
| Backend Framework | NestJS |
| ORM             | TypeORM |
| Database        | MySQL |
| Authentication  | JWT (passport-jwt) |
| Password Hashing| bcrypt |
| API Testing     | Postman |

## Modules

- **Auth** — register, login, JWT issuance
- **Users** — customers, riders, and admins (role-based)
- **Orders** — customer delivery requests
- **Riders** — rider profiles and live location
- **Deliveries** — assigns a rider to an order and tracks status
  (assigned → picked_up → in_transit → delivered/failed)

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your own MySQL credentials
   and a JWT secret. **Never commit your real `.env`.**
   ```bash
   cp .env.example .env
   ```
3. Create the MySQL database (name must match `DB_DATABASE` in `.env`):
   ```sql
   CREATE DATABASE delivery_tracking;
   ```
4. Start the server in watch mode:
   ```bash
   npm run start:dev
   ```
   TypeORM's `synchronize: true` will auto-create all tables on first run.

## Trying It Out

1. `POST /auth/register` — create an account (`role`: customer, rider, or admin)
2. `POST /auth/login` — get back `accessToken`
3. Add `Authorization: Bearer <accessToken>` to every other request
4. `POST /orders` → `POST /riders` → `POST /deliveries` to assign a rider
5. `PATCH /deliveries/:id/status` to move the delivery through its lifecycle

See `docs/API_ENDPOINTS.md` for the full endpoint list.
