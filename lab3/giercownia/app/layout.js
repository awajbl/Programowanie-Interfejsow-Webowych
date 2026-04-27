import "./globals.css";

export const metadata = {
  title: "Giercownia.pl",
  description: "Handel grami planszowymi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <header className="top-bar">
          <h1>Giercownia</h1>
          <nav>
            <button>Zarejestruj</button>
            <button>Zaloguj</button>
            <button>Koszyk</button>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}