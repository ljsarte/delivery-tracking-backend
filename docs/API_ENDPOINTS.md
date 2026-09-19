# API Endpoint Reference (24 endpoints)

🔒 = requires `Authorization: Bearer <token>`

## Auth (2)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Create a new user account |
| POST | /auth/login | Log in, returns a JWT |

## Users (5) 🔒
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /users | Create a user |
| GET | /users | List all users |
| GET | /users/:id | Get one user |
| PATCH | /users/:id | Update a user |
| DELETE | /users/:id | Delete a user |

## Orders (6) 🔒
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /orders | Place a new order |
| GET | /orders | List all orders |
| GET | /orders/customer/:customerId | List one customer's orders |
| GET | /orders/:id | Get one order |
| PATCH | /orders/:id | Update an order |
| DELETE | /orders/:id | Cancel/delete an order |

## Riders (6) 🔒
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /riders | Create a rider profile |
| GET | /riders | List all riders |
| GET | /riders/:id | Get one rider |
| PATCH | /riders/:id | Update rider details |
| PUT | /riders/:id/location | Push the rider's live GPS position |
| DELETE | /riders/:id | Delete a rider |

## Deliveries (5) 🔒
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /deliveries | Assign a rider to an order |
| GET | /deliveries | List all deliveries |
| GET | /deliveries/:id | Get one delivery |
| PATCH | /deliveries/:id/status | Change delivery status |
| PUT | /deliveries/:id/location | Push live delivery GPS position |
| DELETE | /deliveries/:id | Delete a delivery record |

**Total: 24 endpoints** — satisfies the 20-endpoint minimum and covers
GET, POST, PUT/PATCH and DELETE as required.
