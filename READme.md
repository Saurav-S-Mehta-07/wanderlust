# ChillCasa – Airbnb‑Style Property Listing Platform

ChillCasa is a full-stack web application designed to allow users to browse and explore properties (homes, apartments, vacation rentals). The project follows the **MVC (Model–View–Controller)** architecture using **Node.js, Express, MongoDB, and EJS templates** for the frontend.

---

## 🚀 Features

* **Property Browsing & Search**
   * Search and filter properties by location, country, or title (name)
   * View featured and filtered property listings
   * Property Details
   * View individual property details with images, description, and maps
   * Map integration to show property location

* **Authentication**
   * User login and registration
   * Secure authentication using Passport.js

* **Authorization**
   * Protected routes for logged-in users
   * Admin or property owners can manage listings (if implemented)

* **Image Handling**
   * Property images uploaded via Cloudinary
   * Only image URLs stored in MongoDB

* **Error Handling**
   * Centralized error middleware
   * Proper HTTP status codes and messages

---

## 🛠 Tech Stack

### Backend

* **Node.js** – Runtime environment

* **Express.js** – Web framework

* **MongoDB Atlas** – Cloud database

* **Mongoose** – ODM for MongoDB

### Authentication & Security

* **Passport.js** – Authentication

* **Express-Session** – Session management

* **Custom middleware** – Route protection

### File & Image Handling

* **Cloudinary** – Cloud-based image storage

* **Multer** – File upload handling

### Architecture

* **MVC (Model–View–Controller)** pattern

## Maps

* Map integration using MapTiler

---

## 📂 Project Structure

```
ChillCasa/
│
├── controllers/       # Request handling logic
├── models/            # Mongoose schemas
├── routes/            # Application routes
├── middlewares/       # Auth & error handling         
├── views/             # EJS / template files
├── public/            # Static assets (CSS/JS/Images)
├── utils/             # Helper functions
├── app.js             # Application entry point
└── README.md          # Project documentation

```

---

## 🔐 Authentication Flow

1. User registers or logs in

2. Passport authenticates credentials

3. Session is created and stored

4. Protected routes verify authentication and authorization

---

## 🗄 Database

* Hosted on **MongoDB Atlas.**
* Collections include:
  * users – User credentials and profiles
  * listings – Property information and images
  * reviews – User reviews for properties

---

## ☁ Image Storage

  * Property images uploaded to Cloudinary

  * Only image URLs are stored in MongoDB

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```
SECRET=your_session_secret_key
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret
MAP_API_KEY= your_map_api_key
ATLASDB_URL=your_mongoatlas_url

```

---

## ▶️ Installation & Setup

```

 # Clone the repository
 git clone https://github.com/Saurav-S-Mehta-07/ChillCasa.git

 # Go to project directory
 cd ChillCasa

 # Install dependencies
 npm install

 # Start the application
 nodemon app.js
```


---

## 📌 Use Case

ChillCasa is designed for:

   * Users to browse and explore property listings
   * View property details including images, description, and location on maps
   * Property owners to showcase their homes
   * ⚠️ Note: This system is primarily for educational and learning purposes.

---

## 📖 Learning Outcomes
   * MVC architecture in Node.js
   * Authentication & authorization using Passport
   * Session-based security
   * MongoDB Atlas integration
   * Cloudinary image uploads
   * Map integration for property locations
   * Middleware-driven error handling
---

## 📄 License

This project is for educational and learning purposes.
---







