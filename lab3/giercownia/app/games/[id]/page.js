import Link from "next/link";
import gamesData from "@/data/board-games.json"; // baza gier w pliku

export default function GameDetails({ params }) {
  const { id } = params;
  const game = gamesData.board_games.find(g => g.id === parseInt(id));

  if (!game) return <p>Nie znaleziono gry.</p>;

  return (
    <main style={{ flexDirection: 'column' }}>
      <Link href="/" style={{ marginBottom: '1rem', color: 'var(--search-col)' }}>← Powrót do listy</Link>
      
      <div className="product-card" style={{ width: '100%', maxWidth: '900px' }}>
        <h1>{game.title}</h1>
        <p><em>Wydawca: {game.publisher}</em></p>
        
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '2' }}>
            <h3>O grze</h3>
            {game.description.map((p, i) => (
              <p key={i} style={{ marginBottom: '0.8rem' }}>{p}</p>
            ))}
          </div>
          
          <div style={{ flex: '1', background: '#f9f9f9', padding: '1.5rem', borderRadius: '5px' }}>
            <p><strong>Cena:</strong> {game.price_pln} zł</p>
            <p><strong>Typ:</strong> {game.type}</p>
            <p><strong>Gracze:</strong> {game.min_players} - {game.max_players}</p>
            <p><strong>Średni czas:</strong> {game.avg_play_time_minutes} min</p>
            <p><strong>Dodatek:</strong> {game.is_expansion ? "Tak" : "Nie"}</p>
            <button className="search-button" style={{ width: '100%', marginTop: '1rem' }}>Kup teraz</button>
          </div>
        </div>

        {game.images.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Zdjęcia</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              {game.images.map((img, idx) => (
                <div key={idx} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                  <code>{img}</code>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}