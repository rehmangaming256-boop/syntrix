import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SYNTRIX",
  description: "Human Optimization System",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          id="service-worker"
          strategy="afterInteractive"
        >
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker
                  .register('/sw.js')
                  .then(() => {
                    console.log('SW Registered');
                  })
                  .catch((err) => {
                    console.log('SW Failed', err);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}