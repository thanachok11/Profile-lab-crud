# 📱 Profile-app-Section3

A modern and interactive profile showcase app built using **React Native** and **Expo Router**. This app displays personal profile information, course details, and allows user authentication with a clean and elegant UI supporting both light and dark modes.

## ✨ Features

* 👤 **User Profile** with avatar, name, education, and interests
* 🔐 **Authentication system** (Sign In / Sign Up)
* 🧠 **Conditional routing** with token persistence via AsyncStorage
* 📘 **Course Information**: *Hybrid Mobile Application Programming (IN405109)*
* 👨‍🏫 **Instructor details** with profile image
* 🌗 **Theme Toggle** (Dark / Light) powered by Context API
* 🔗 **Social Links** (Facebook, GitHub, LinkedIn)
* 💬 **Animated Cards** with smooth scaling effect on press
* 📱 **Mobile Responsive** and optimized for real-world usage

## 🛠️ Tech Stack

* React Native
* Expo
* Expo Router
* React Native Vector Icons
* Context API
* AsyncStorage (for token storage)
* Animated API

## 🚀 Getting Started

### Prerequisites

* Node.js
* Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
npm install
```

### Running the App

```bash
npx expo start
```

Then scan the QR code with **Expo Go** or use an emulator.

## 🔄 Project Structure

```
Profile-app-Section3/
├── app/
│   ├── index.jsx             # Redirects based on auth token
│   ├── main.jsx              # Main Profile Page after login
│   ├── signin.jsx            # Sign In screen
│   ├── signup.jsx            # Sign Up screen
│   ├── about.jsx             # About the Course page
│   ├── book.jsx              # Book Collection page
│   ├── profile.jsx           # User Profile screen (from menu)
│   └── _layout.js            # Stack Navigation with Theme + Auth
├── components/
│   ├── ThemeToggle.jsx       # Theme switch in header
│   └── AuthToggle.jsx        # Avatar or Sign In/Up button in header
├── context/
│   └── ThemeContext.js       # Theme state (Dark / Light)
├── assets/
│   └── image/
│       ├── profile.jpg       # User profile image
│       └── teacher.jpg       # Instructor image
├── package.json
└── README.md
```

## 🦠 Demo Highlights

* 🔄 Auto redirect to `/signin` if token is missing
* 🧮 AsyncStorage-based session memory
* 👤 Avatar in header using user's first letter
* 🎨 Color themes switch in real-time

## 👤 Author


Crafted with ❤️ for the course *Hybrid Mobile Application Programming* (**IN405109**)
**Computer Science, Khon Kaen University**
