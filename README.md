# Assignment 01 — Persona-Based AI Chatbot

## Setup Instructions

1. **Clone the repository** or download the source code.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Copy the `.env.example` file to `.env.local` and add your Gemini API Key.
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add VITE_GEMINI_API_KEY=your_api_key_here
   ```
   *(Note: The key uses `VITE_GEMINI_API_KEY` or `GEMINI_API_KEY` depending on the environment)*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Switch between 3 Scaler Personas: Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra.
- Live streaming/API generation using Gemini 2.5 Flash.
- Suggestion chips for quick starting.
- Persona-specific system prompts with Chain-of-Thought reasoning.
- Dark mode, mobile-responsive UI.

## File Structure
- `src/lib/personas.ts`: Contains the definitions and system prompts for the personas.
- `src/app/api/chat/route.ts`: Next.js App Router API endpoint that securely communicates with the Gemini API.
- `src/app/page.tsx`: The main frontend interface.
