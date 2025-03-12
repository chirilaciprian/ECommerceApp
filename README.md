# ECommerce Website

This is a full-stack **ECommerceApp** featuring a wide selection of clothes. It offers **seamless browsing, secure checkout, and a user-friendly interface** to enhance the shopping experience. Additionally, it includes an **AI-powered recommendation system** that suggests products based on user preferences.

## Deployment

The app is deployed and can be accessed at [https://fashionappcip.onrender.com/](https://fashionappcip.onrender.com/).

**Note:** Due to cold start latency, both the main API and the recommendation API may take up to **1 minute** to start when accessed for the first time.


## Tech Stack

- **Frontend**:
  - React
  - Vite
  - Tailwind CSS + DaisyUI
  - TypeScript
- **Backend**:
  - Node.js
  - Express
  - TypeScript
- **Machine Learning**:
  - Python (Flask API)
  - Cosine Similarity for product recommendations
- **Testing**:
  - Jest
  - Supertest
- **Database**:
  - PostgreSQL
  - Prisma ORM

## Machine Learning Recommendation System

This e-commerce platform features a **product recommendation system** powered by **cosine similarity**. The system is implemented in **Python** and runs as a **Flask API**, which exposes an endpoint to send and receive recommendation data. The algorithm analyzes product descriptions, categories, and user interactions to provide **personalized suggestions**.

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/yourusername/ECommerceApp.git
   cd ECommerceApp
   ```

2. **Install Backend Dependencies**:

   ```sh
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:

   ```sh
   cd frontend
   npm install
   ```

4. **Set Up the Database**:

   - Ensure **PostgreSQL** is running.
   - Configure the **Prisma schema**.
   - **Seed the Database**:
     ```sh
     npx ts-node src/utils/ImportCategoriesFromCsv.ts
     npx ts-node src/utils/ImportProductsFromCsv.ts
     npx ts-node src/utils/priceUpdates.ts
     npx ts-node src/utils/applyRandomDiscounts.ts
     ```

5. **Run the Machine Learning API**:

   ```sh   
   pip install
   python app.py
   ```

6. **Run the Backend Server**:

   ```sh
   cd backend
   npm run start
   ```

7. **Run the Frontend**:

   ```sh
   cd frontend
   npm run dev
   ```

Now, the app should be running locally, and the **recommendation system** will provide personalized product suggestions based on user behavior.

