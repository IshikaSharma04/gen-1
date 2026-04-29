import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scaler AI Mentors | Persona-Based Chatbot",
  description: "Have real conversations with Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
