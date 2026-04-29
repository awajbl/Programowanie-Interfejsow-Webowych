"use client"; // Musimy użyć trybu klienta, aby korzystać z hooków

import { use } from "react";
import gamesData from "@/data/board-games.json";
import Link from "next/link";

export default function GameDetails({ params }) {
  // Rozpakowujemy promise params za pomocą hooka use()
  const resolvedParams = use(params);

  // Szukamy gry w danych na podstawie id
  const game = gamesData.board_games.find(g => g.id === parseInt(resolvedParams.id));

  const addPlaceholder = (e) => {
    e.target.src = "/placeholder_300x300.webp";
  };

  if (!game) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>Nie znaleziono gry.</h1>
        <Link href="/" style={{textDecoration: 'none'}}>&#60; Powrót do listy</Link>
      </main>
    );
  }

  return (
    <main className="details-container" style={{ padding: "20px" }}>
      <Link href="/" style={{ marginBottom: "20px", textDecoration: 'none' }}>
        &#60; Powrót do listy
      </Link>
      
      <section className="game-details">
        <h1>
          {game.title} {game.is_expansion && <small style={{ color: "#666" }}>(Dodatek)</small>}
        </h1>
        
        <div className="image-gallery" style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "20px 0" }}>
          {game.images && game.images.length > 0 ? (
            game.images.map((img, index) => (
              <img 
                key={index} 
                src={`/${img}`} 
                onError={addPlaceholder}
                alt={`${game.title} - zdjęcie ${index + 1}`} 
                style={{ width: '300px', height: 'auto', borderRadius: '8px', border: '1px solid #ddd' }} 
              />
            ))
          ) : (
            <div className="no-image" style={{ padding: "20px", background: "#eee", borderRadius: "8px" }}>
              Brak dostępnych zdjęć
            </div>
          )}
        </div>

        <div className="info-section">
          <h2>Opis</h2>
          <ul style={{ lineHeight: "1.6" }}>
            {game.description.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          
          <div className="specs" style={{ marginTop: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "8px" }}>
            <p><strong>Wydawca:</strong> {game.publisher}</p>
            <p><strong>Typ:</strong> {game.type}</p>
            <p><strong>Liczba graczy:</strong> {game.min_players} - {game.max_players}</p>
            <p><strong>Czas gry:</strong> ok. {game.avg_play_time_minutes} min</p>
            <p className="price-tag" style={{ fontSize: "1.5rem", color: "#2ecc71", fontWeight: "bold" }}>
              Cena: {game.price_pln} zł
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}