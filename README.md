# Assignment 01 — Persona-Based AI Chatbot

## Project Overview

This project is a Persona-Based AI Chatbot built using modern web technologies and powered by Gemini 2.5 Flash API. The chatbot allows users to interact with three different Scaler personas, each having their own unique communication style, teaching approach, and personality.

The goal of this project is to create a realistic mentor-style chatbot experience where users can switch between personas and receive responses that match the selected mentor’s behavior and expertise.

---

## Installation Guide

### Step 1: Get the Source Code

Clone the repository or download the project files to your local system.

```bash
git clone <your-repository-link>
```

Or simply download the ZIP file and extract it.

---

### Step 2: Install Required Packages

Open the project folder in terminal and run:

```bash
npm install
```

This will install all required dependencies.

---

### Step 3: Configure Environment Variables

Create a new file named `.env.local` by copying `.env.example`.

```bash
cp .env.example .env.local
```

Now open `.env.local` and add your Gemini API Key:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Some environments may use:

```env
GEMINI_API_KEY=your_api_key_here
```

Make sure your API key is valid for proper chatbot functionality.

---

### Step 4: Start the Development Server

Run the following command:

```bash
npm run dev
```

This will start the local development server.

---

### Step 5: Open in Browser

Visit the following URL in your browser:

```text
http://localhost:3000
```

Your chatbot application should now be running successfully.

---

## Main Features

### Multiple Persona Switching

Users can switch between three Scaler mentors:

* Anshuman Singh
* Abhimanyu Saxena
* Kshitij Mishra

Each persona responds differently based on their unique teaching and mentoring style.

---

### Gemini 2.5 Flash Integration

The chatbot uses Gemini 2.5 Flash API for:

* Fast responses
* Live generation
* Smart conversational flow
* Better AI interaction quality

---

### Suggestion Chips

Quick-start suggestion chips help users begin conversations faster without typing full questions manually.

---

### Persona-Specific Prompting

Each mentor uses a dedicated system prompt with personality-based behavior and structured reasoning for more realistic answers.

---

### Responsive UI + Dark Mode

The application supports:

* Mobile responsiveness
* Clean UI design
* Dark mode support
* Smooth chat experience across devices

---

## Project Folder Structure

### `src/lib/personas.ts`

This file contains:

* Persona definitions
* Mentor information
* System prompts
* Behavior instructions for each chatbot personality

---

### `src/app/api/chat/route.ts`

This is the backend API route responsible for:

* Secure Gemini API communication
* Handling user messages
* Sending prompts to Gemini
* Returning AI-generated responses

---

### `src/app/page.tsx`

This is the main frontend page that includes:

* Chat interface
* Persona switching UI
* Message display
* Input field
* Suggestion chips
* Full chatbot interaction experience

---

## Final Objective

The purpose of this assignment is to demonstrate:

* API integration skills
* Frontend development ability
* Prompt engineering knowledge
* Real-world chatbot system design
* Professional UI/UX implementation

This project combines both technical implementation and user experience design into one complete assignment.
