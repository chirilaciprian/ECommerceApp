# ECommerce Website

This is a full-stack ECommerceApp featuring a wide selection of handwatches. It offers seamless browsing, secure checkout, and a user-friendly interface to shop for premium watches. 

## Live Demo
🚨 **Currently Unavailable**
The live demo is no longer accessible due to expired hosting. Please refer to the screenshots and setup instructions to run it locally.

Database hosted on AWS RDS.  
Frontend and Backend hosted on render.com.  

⚠️ **Note**: On first use, the app may take 1-2 minutes to load due to a cold start.  

Check out the demo on this link:  
[Live Demo](https://ciprianecommerce-ggs5.onrender.com)

## Features
- **Product Catalog**: Browse and search through various electronics categories including smart TVs, smartphones, smartwatches, laptops, and gaming consoles.
- **Product Details**: View detailed information about each product, including images, descriptions, ratings, and prices.
- **Shopping Cart**: Add products to the cart and proceed to checkout.
- **User Authentication**: Secure user authentication for logging in and managing orders.
- **Order Management**: Users can view their order history and details.

  
## Features I'm Working On
- **Adkmin Pannel**:An admin pannel for db administration
- **Email Service**: Integration with an email service provider to enable functionalities such as order confirmations, password resets, and promotional emails.
- **Review System**: A feature that allows users to leave reviews and ratings for products, providing valuable feedback and insights for future customers.
- **Wishlist System**: Users can create and manage a wishlist of their favorite products, making it easier to keep track of items they wish to purchase in the future.
- **Back-end unit tests needs to be updated**
  
## Tech Stack
- **Frontend**:
  - React
  - Vite
  - Tailwind CSS + DaisyUi
  - TypeScript
- **Backend**:
  - Node.js
  - Express
  - TypeScript
- **Testing**:
  - Jest
  - Supertest
- **Database**:
  - PostgreSQL
  - Prisma ORM
## Installation

Follow these steps to set up and run the project locally:

- **Install Backend Dependencies**: Run `npm install` in the `backend` directory.
- **Install Frontend Dependencies**: Run `npm install` in the `frontend` directory.
- **Seed the Database**: The seed file is located at `src/utils/seed.ts`. Run `npx ts-node src/utils/seed.ts` to populate the database with initial data.

## Screenshots

### Homepage

![Homepage Screenshot](docs/images/HomePage.png)

### Product Page

![Products Page Screenshot](docs/images/ProductsPage.png)

### Product Overview

![ProductOverview Page Screenshot](docs/images/ProductOverview.png)

### SignUp Page

![SignUp Page Screenshot](docs/images/SignUpPage.png)


### Cart Page

![Cart Page Screenshot](docs/images/CartPage.png)


### Order Page

![Order Page Screenshot](docs/images/OrderPage.png)

### MyOrders Page

![MyOrders Page Screenshot](docs/images/MyOrdersPage.png)
