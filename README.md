# 🌍 Travel Planner App

This project is part of Udacity's Front-End Web Developer Nanodegree Program. The objective is to build a web application that allows users to plan trips by entering a destination and departure date. The app fetches weather forecasts and location images using external APIs.

## 📑 Table of Contents

- [📖 Project Overview](#-project-overview)
- [⚙️ Installation](#-installation)
- [🚀 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [🛠 Technologies Used](#-technologies-used)
- [🔑 API Information](#-api-information)
- [🧪 Testing](#-testing)
- [🛠 Development & Production Modes](#-development--production-modes)
- [📜 License](#-license)

---

## 📖 Project Overview

This web application allows users to:
- Enter a destination and departure date. 📅📍
- Fetch weather forecasts (current or future) using the **Weatherbit API**. 🌤️🌧️
- Retrieve location images using the **Pixabay API**. 🖼️
- View a countdown to the trip. ⏳
- Save and manage trips with a clean and responsive UI. 💾

---

## ⚙️ Installation

### 🔧 Prerequisites  

- **🟢 Node.js:** Ensure you have Node.js installed. This project is compatible with **`Node.js v22.12.0`**.  

  - To check your Node.js version, run:  
    ```bash
    node -v
    ```
  - If you need to install or update Node.js, download it from the official [🌐 Node.js website](https://nodejs.org/). 🚀  

### 👣 Steps
To set up and run this project locally, follow these steps:

1. 📥 Clone the repository:
   ```bash
   git clone https://github.com/Haneen-Alhajali/travel-planner-app
   cd travel-planner-app
   ```
2. 📦 Install dependencies:
   ```bash
   npm install
   ```
3. 🔑 Create a `.env` file in the root directory and Add your API keys:
   ```
   GEO_USER=your_geonames_username
   WEATHER_KEY=your_weatherbit_key
   PIXABAY_KEY=your_pixabay_key
   ```
   > **Note:** Sign up at [Geonames](https://www.geonames.org/), [Weatherbit](https://weatherbit.io/), and [Pixabay](https://pixabay.com/api/docs/) to get your API keys
4. ▶️ Start the server:
   ```bash
   npm run start
   ```
5. 🔧 Build the project:
     - For production:
        ```bash
       npm run build-prod
        ```
     - For development:
        ```bash
        npm run build-dev 
        ```
6. 🌐 Open your browser and go to:
   ```
   http://localhost:8082
   ```

## 🚀 Usage

1. Enter a destination (e.g., "Paris, France") and a future departure date. 🌍📅

2. Click the "Save Trip" button. 💾

3. The app will display:

   - A countdown to the trip. ⏳

   - Weather forecasts (high/low temperatures and descriptions). 🌡️☀️🌧️

   - An image of the destination. 🖼️

4. Remove trips by clicking the "Remove Trip" button. 🗑️

## 📂 Project Structure

```
.
├── src/
│   ├── client/
│   │   ├── js/
│   │   │   ├── formHandler.js
│   │   │   ├── updateUI.js
│   │   │   ├── serviceWorker.js
│   │   ├── styles/
│   │   │   ├── _animations.scss
│   │   │   ├── _background-icons.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _new-trip.scss
│   │   │   ├── _responsive.scss
│   │   │   ├── _travel-planner.scss
│   │   │   ├── _trip-card.scss
│   │   │   ├── _variables.scss
│   │   │   ├── main.scss
│   │   ├── views/
│   │   │   ├── index.html
│   │   ├── index.js
│   ├── server/
│   │   ├── server.js
│   ├── tests/
│   │   ├── server.test.js
│   │   ├── formAndUI.test.js
├── .babelrc
├── .gitignore
├── .env
├── jest.config.js
├── package-lock.json
├── package.json
├── webpack.dev.js
├── webpack.prod.js
├── README.md
```

## 🛠 Technologies Used
- 🏗 Frontend: HTML, SCSS, JavaScript
- ⚙️ Backend: Node.js with Express.js
- 📦 Build Tool: Webpack (for bundling and module handling)
- 🌍 APIs:
  - Geonames API (for location data) 🌍
  - Weatherbit API (for weather forecasts) 🌤️🌧️
  - Pixabay API (for location images) 🖼️
- 🧪 Testing: Jest 🧪
- 🔄 Offline Support: Workbox (for service workers)

## 🔑 API Information

The project utilizes the following APIs:

- Geonames API: Fetches latitude, longitude, and country information for the destination. 🌍

- Weatherbit API: Provides current or future weather forecasts based on coordinates. 🌤️🌧️

- Pixabay API: Retrieves images of the destination. 🖼️

Ensure you have valid API keys stored in the `.env` file.

## 🧪 Testing

Testing is a critical part of this project to ensure the application works as expected. The project uses Jest for unit testing and Supertest for server testing. Below are the test scripts and how to run them:

#### Test Scripts
- Run all tests:

   ```bash
   npm test
   ```
- Run server tests only:

   ```bash
   npm run test-server
   ```
- Run client (form and UI) tests only:
   ```bash
   npm run test-formAndUI
   ```
---
> 🧪 Notes on Testing
>
>⚠️ Port Conflicts: If the server is already running on port `8082`, you may encounter errors when running tests. To resolve this, use the following command to kill the port before running tests:

   ```bash
      npx kill-port 8082
   ```
---


### 📋 Test Coverage

1. 🖥️ Server Tests

   Validate the Express server's API endpoints, including:
   - ✅ Successful trip data retrieval.
   - ⚠️ Error handling for missing or invalid inputs.
   - ❓ Handling of API errors (e.g., location not found).

2. 💻 Client Tests

   Validate the frontend functionality, including:
   - 📝 Form submission and validation.
   - 🔄 UI updates based on API responses.
   - ⚠️ Error messages for invalid inputs or API failures.

## 🛠 Development & Production Modes

- To run the project in **development mode**:

  ```bash
  npm run build-dev 
  ```

  This enables live reloading with Webpack Dev Server.

- To build for **production**:

  ```bash
  npm run build-prod
  ```

  This optimizes and bundles the files.

## 📜 License
📚 This project is for educational purposes as part of Udacity's Nanodegree Program.

---

🔗 **Author:** Haneen Alhajali  
📌 **Status:** 🎓 Educational Project  
📅 **Last Updated:** `2025` 
