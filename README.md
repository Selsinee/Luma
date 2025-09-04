# Luma - Flashcard App Frontend

This repository contains the frontend for the Luma flashcard application, built with React Native and Expo. It provides a rich, intuitive mobile experience for users to create decks, study words with flashcards, and track their learning progress.

This application is designed to communicate with the [Luma Backend API](https://github.com/Selsinee/luma-backend.git).

## Tech Stack 📱

- **Framework**: React Native with Expo (SDK 53)
- **Language**: TypeScript
- **Navigation**: Expo Router (~5.1.4)
- **Animations**: Reanimated (~3.17.4)
- **Gestures**: React Native Gesture Handler (~2.24.0)
- **Charts**: `react-native-gifted-charts` (~1.4.64)
- **Icons**: `@expo/vector-icons` (~14.1.0)
- **Linting/Formatting**: ESLint & Prettier

---

## Project Structure

The project uses Expo Router's file-based routing system, which organizes screens and layouts within the `app/` directory.

```
/luma-frontend/
├── /app/                   # Main application routes
│   ├── (app)/              # Routes protected by authentication
│   │   ├── (tabs)/         # Main tab navigator layout
│   │   ├── deck-details.tsx
│   │   └── ...
│   ├── _layout.tsx
│   └── index.tsx           # Authentication screen
│
├── /assets/                # Fonts, icons, and images
├── /components/            # Reusable UI components
├── /constants/             # App-wide constants like colors
└── ...
```

---

## Setup and Installation 🚀

Follow these steps to get the development environment running locally.

### 1. Prerequisites

- Node.js (LTS version)
- Git
- Expo Go app on your physical device (iOS or Android)
- An account on [expo.dev](https://expo.dev)

### 2. Clone the Repository

```bash
git clone https://github.com/Selsinee/Luma.git
cd Luma
```

### 3. Install Dependencies

Install all the required npm packages.

```bash
npm install
```

### 4. Configure Environment Variables

The app needs to know the URL of the backend API. Create a `.env` file in the root of the project to store this information.

```bash
# .env
EXPO_PUBLIC_API_URL="http://<your-local-ip-address>:8000"
```

> **Important:** To connect to a local server from the Expo Go app, you cannot use `localhost`. You must use your computer's local network IP address (e.g., `192.168.1.10`).

---

## Running the Application

With the setup complete, start the Expo development server.

```bash
npm start
```

This will open a new tab in your web browser with a QR code.

1.  Open the **Expo Go** app on your phone.
2.  Scan the QR code from the browser or terminal.
3.  The Luma app will load and run on your device.

The app will automatically reload whenever you make changes to the code.
