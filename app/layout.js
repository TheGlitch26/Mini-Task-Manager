import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "TaskFlow — Mini Task Manager",
  description: "A focused task manager for high-performing teams.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent dark/light flash on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('tf-theme');
                if (saved) document.documentElement.setAttribute('data-theme', saved);
                else document.documentElement.setAttribute('data-theme', 'dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
