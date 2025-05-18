# 🌍 AirBnB Clone

![AirBnB Clone](https://img.shields.io/badge/AirBnB_Clone-v1.0-blue)

Welcome to the **AirBnB Clone** repository! This project is a full-stack web application that mimics the core features of Airbnb. Built with a modern tech stack, it offers a seamless user experience for property listings, user authentication, and reviews. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

## Introduction

The **AirBnB Clone** aims to replicate the essential functionalities of Airbnb. Users can create accounts, list properties, leave reviews, and browse through various listings. The application is designed to be user-friendly and responsive, ensuring a great experience on both desktop and mobile devices.

## Features

- **User Authentication**: Secure login and registration using Passport.js.
- **Property Listings**: Users can create, edit, and delete property listings.
- **Reviews**: Users can leave reviews on properties they have rented.
- **Responsive Design**: The app adapts to various screen sizes for optimal usability.
- **Session Management**: Utilizes connect-mongo for session handling.

## Tech Stack

The application is built using the following technologies:

- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web framework for building APIs and web applications.
- **MongoDB**: NoSQL database for storing data.
- **EJS**: Templating engine for rendering HTML.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Passport.js**: Middleware for authentication.
- **Connect-mongo**: MongoDB session store for Express.

## Installation

To get started with the AirBnB Clone, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Latolato1609/AirBnB.git
   cd AirBnB
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

Your application should now be running on `http://localhost:3000`.

## Usage

Once the application is running, you can access it through your web browser. Here are some things you can do:

- **Register**: Create a new account to start listing properties.
- **Login**: Use your credentials to log in.
- **List Properties**: Add new properties with descriptions, images, and pricing.
- **Leave Reviews**: After renting a property, leave feedback for future users.

For detailed updates and releases, you can check the [Releases section](https://github.com/Latolato1609/AirBnB/releases). 

## Contributing

We welcome contributions! If you'd like to contribute to the AirBnB Clone, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Make your changes**.
4. **Commit your changes**:
   ```bash
   git commit -m "Add some feature"
   ```
5. **Push to the branch**:
   ```bash
   git push origin feature/YourFeature
   ```
6. **Open a pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Links

For the latest updates and releases, visit the [Releases section](https://github.com/Latolato1609/AirBnB/releases). 

![Visit Releases](https://img.shields.io/badge/Visit_Releases-brightgreen)

## Conclusion

Thank you for checking out the AirBnB Clone! We hope you find this project useful and informative. Feel free to reach out with any questions or feedback. Happy coding!