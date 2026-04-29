"use client";
import { use } from "react";
import gamesData from "@/data/board-games.json";
import Link from "next/link";

export default function GameDetails({ params }) {
  const resolvedParams = use(params);

  const game = gamesData.board_games.find(g => g.id === parseInt(resolvedParams.id));


  const placeholderImage = (e) => {
    e.target.src = "/placeholder_300x300.webp";
    console.log("Nie znaleziono obrazu.")
  };


  if (!game) {
    return (
      <main>
        <h1>Nie znaleziono gry.</h1>
        <Link href="/" style={{textDecoration: 'none'}}>&#60; Powrót do listy</Link>
      </main>
    );
  }

  return (
    <main className="details-container">
      <Link href="/" className="back-link">
        &#60; Powrót do listy
      </Link>
      
      <section className="game-details">
        <h1>
          {game.title} {game.is_expansion && <small className="expansion-label">(Dodatek)</small>}
        </h1>
        
        <div className="image-gallery">
          {game.images && game.images.length > 0 ? (
            game.images.map((img, index) => (
              <img 
                key={index} 
                src={`/${img}`} 
                onError={placeholderImage}
                alt={`${game.title} - zdjęcie ${index + 1}`} 
                className="gallery-img"
              />
            ))
          ) : (
            <div className="no-image">
              Brak dostępnych zdjęć
            </div>
          )}
        </div>

        <div className="info-section">
          <h2>Opis</h2>
          <ul className="description-list">
            {game.description.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          
          <div className="specs-box">
            <p><strong>Wydawca:</strong> {game.publisher}</p>
            <p><strong>Typ:</strong> {game.type}</p>
            <p><strong>Liczba graczy:</strong> {game.min_players} - {game.max_players}</p>
            <p><strong>Czas gry:</strong> ok. {game.avg_play_time_minutes} min</p>
            <p className="price-tag">
              Cena: {game.price_pln} zł
            </p>
          </div>


          <Link href={`/games/${resolvedParams.id}/edit`}>
            <button className="btn-edit">
              Edytuj grę
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}