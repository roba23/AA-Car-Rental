# Car Rental Application

A car rental web application where customers can browse available vehicles, filter by type and price, review vehicle details, place rental orders, and pay through Chapa. Administrators can review booking requests and approve or decline them from the dashboard.

## Features

- Browse a responsive fleet of rental cars
- Filter cars by category and price
- View vehicle specifications and availability
- Place a rental booking request
- Pay with Chapa
- Track booking history
- Admin dashboard for managing vehicle listings and orders

## Chapa sandbox payment testing

> **Important:** The credentials below are for Chapa's sandbox/test environment only. Never use them in production, and never commit live payment credentials, secret keys, or customer card data to GitHub.

### Test with a credit card

| Field | Test value |
| --- | --- |
| Card number | `4200 0000 0000 0000` |
| CVV | `123` |
| Expiry date | `12/34` |

### Test with a phone payment
Telebirr
Phone: 0900123456
Phone: 0900112233

Mpesa
Phone: 0700123456
Phone: 0700112233

## Collaboration

AA Car Rental was developed collaboratively by Bereket Woldemariyam (@bereket2114) and Robel (@roba23) through paired programming and live screen-sharing sessions.

### Shared contributions

- Co-developed backend order workflows
- Integrated the Chapa sandbox payment flow
- Implemented admin order review, approval, and rejection workflows
- Built and tested booking features together

### Bereket Woldemariyam's contributions

- Implemented logic that prevents users from ordering unavailable cars
- Built the order-history page
- Contributed to backend order logic, testing, and feature discussions
