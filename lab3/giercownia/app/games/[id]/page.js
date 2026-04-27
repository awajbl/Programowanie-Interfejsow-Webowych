import gamesData from "@/data/board-games.json";
import Link from "next/link";

export default function GameDetails({ params }) {
  const game = gamesData.board_games.find(g => g.id === parseInt(params.id));

  if (!game) return <div>Nie znaleziono gry.</div>;

  return (
    <main className="details-container">
      <Link href="/">← Powrót do listy</Link>
      
      <section className="game-details">
        <h1>{game.title} {game.is_expansion && <small>(Dodatek)</small>}</h1>
        
        <div className="image-gallery">
          {game.images.length > 0 ? (
            game.images.map((img, index) => (
              <img key={index} src={`/${img}`} alt={game.title} style={{width: '200px', margin: '10px'}} />
            ))
          ) : (
            <div className="no-image">Brak zdjęć</div>
          )}
        </div>

        <div className="info-section">
          <h2>Opis</h2>
          <ul>
            {game.description.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          
          <div className="specs">
            <p><strong>Wydawca:</strong> {game.publisher}</p>
            <p><strong>Typ:</strong> {game.type}</p>
            <p><strong>Liczba graczy:</strong> {game.min_players} - {game.max_players}</p>
            <p><strong>Czas gry:</strong> ok. {game.avg_play_time_minutes} min</p>
            <p className="price-tag">Cena: {game.price_pln} zł</p>
          </div>
        </div>
      </section>
    </main>
  );
}