# Wanderlust - Vacation Rental Platform

Wanderlust is a full-stack web application inspired by Airbnb, designed to allow users to list, discover, and book vacation rentals around the world. It features a robust backend, a responsive frontend, and essential functionalities like user authentication, image uploading, and interactive maps (planned).

## 🚀 How It Works

### 1. User Authentication
- **Sign Up/Login:** Users can create an account or log in securely using Passport.js.
- **Role-Based Access:** 
    - **Guests:** Can view listings and reviews.
    - **Logged-in Users:** Can create listings, leave reviews, and edit/delete their own content.
    - **Owners:** The creator of a listing has exclusive rights to edit or delete it.

### 2. Listing Management
- **Create:** Authenticated users can post new listings with details like title, description, price, location, and images.
- **Read:** The home page displays all listings with filtering options (Trending, Mountains, Iconic Cities, etc.).
- **Update/Delete:** Owners can modify or remove their listings.
- **Filtering:** Users can filter listings by categories (e.g., "Mountains", "Amazing Pools") to find exactly what they're looking for.

### 3. Reviews & Ratings
- Users can leave star ratings and comments on listings.
- Reviews are displayed on the listing page and can be deleted by their authors.

### 4. Search Functionality
- A search bar allows users to find listings by title, location, or country.

## 🛠️ Tech Stack

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for handling routes and middleware.
- **MongoDB & Mongoose:** NoSQL database and ODM for data modeling.
- **Passport.js:** Authentication middleware.
- **Joi:** Data validation library.
- **Connect-Flash:** For displaying temporary messages (success/error).
- **EJS-Mate:** Layout boilerplate for EJS templates.

### Frontend
- **HTML5 & CSS3:** Structural and styling fundamentals.
- **Bootstrap 5:** Responsive design framework.
- **EJS (Embedded JavaScript):** Templating engine for dynamic content.
- **FontAwesome:** Icons for UI elements.

### Tools & Deployment
- **Git & GitHub:** Version control.
- **Cloudinary:** (Integrated/Planned) For image storage.
- **Mapbox:** (Integrated/Planned) For displaying maps.

## 📚 Interview Questions & Answers

### Q1: What is the MVC architecture, and how is it used in Wanderlust?
**A:** MVC stands for **Model-View-Controller**. 
- **Model (Mongoose Schemas):** Defines the data structure (e.g., Listing, Review, User).
- **View (EJS Templates):** Handles the UI and presentation layer.
- **Controller (Express Logic):** Processes requests, interacts with the Model, and renders the View.
In Wanderlust, `models/listing.js` is the Model, `views/listings/index.ejs` is the View, and `controllers/listings.js` contains the Controller logic.

### Q2: Why did you use MongoDB instead of a SQL database?
**A:** MongoDB (NoSQL) offers flexibility with schema-less documents, making it ideal for handling varied listing data (e.g., different amenities, image formats). It scales horizontally well and integrates seamlessly with JavaScript (JSON-like syntax).

### Q3: How do you handle authentication and authorization?
**A:** 
- **Authentication:** Verifying who the user is (handled by `Passport.js` with `LocalStrategy`).
- **Authorization:** Verifying what the user is allowed to do (handled by middleware like `isLoggedIn` and `isOwner`). For example, only the owner of a listing can edit it.

### Q4: Explain the purpose of `connect-flash`.
**A:** `connect-flash` stores temporary messages (like "Successfully logged in" or "Listing deleted") in the session. These messages are displayed once upon the next request (e.g., after a redirect) and then cleared, providing a good user experience.

### Q5: How does the category filtering work?
**A:** 
1. The frontend sends a GET request with a query parameter (e.g., `?category=Mountains`).
2. The Express controller extracts `req.query.category`.
3. It constructs a MongoDB query object: `{ category: "Mountains" }`.
4. `Listing.find(query)` retrieves only the matching documents.
5. The view renders the filtered list.

### Q6: What is Middleware in Express?
**A:** Middleware functions have access to the request object (`req`), the response object (`res`), and the next middleware function (`next`). They can execute code, modify requests/responses, and end the request-response cycle. In Wanderlust, we use middleware for authentication (`isLoggedIn`), validation (`validateListing`), and error handling.

### Q7: How do you handle errors in this application?
**A:** We use a custom `ExpressError` class and a global error-handling middleware. Async errors are caught using a wrapper function (`wrapAsync`) to pass them to the error handler, which renders a user-friendly error page.

### Q8: Why use `Joi` for validation?
**A:** While Mongoose provides schema validation, `Joi` allows for server-side validation of the request body *before* it reaches the database. This saves resources and provides detailed error messages if data is missing or incorrect (e.g., negative price).

## 📂 Project Structure
```
wanderlust/
├── controllers/    # Route logic
├── init/           # Database seeding scripts
├── models/         # Mongoose schemas
├── public/         # Static assets (CSS, JS, images)
├── routes/         # Express routes
├── utils/          # Helper functions (ExpressError, wrapAsync)
├── views/          # EJS templates
├── app.js          # Entry point
└── package.json    # Dependencies
```

## 🏁 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   node app.js
   ```
4. **Visit:** `http://localhost:8080`
