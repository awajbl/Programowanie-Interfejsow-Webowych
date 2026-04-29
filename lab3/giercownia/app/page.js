"use client";
import { useState } from "react";
import gamesData from "@/data/board-games.json";
import Link from "next/link";

export default function Home() {
  const [filters, setFilters] = useState({
    maxPrice: "",
    minPrice: "",
    type: "Wszystkie",
    minPlayers: "",
    maxPlayers: "",
    publisher: "",
    descriptionWord: "",
    minTime: "",
    maxTime: ""
  });

  const [filteredGames, setFilteredGames] = useState(gamesData.board_games);

  const handleSearch = () => {
    let filtered = gamesData.board_games.filter((game) => {
      if (filters.minPrice && game.price_pln < filters.minPrice) return false;
      if (filters.maxPrice && game.price_pln > filters.maxPrice) return false;
      if (filters.type !== "Wszystkie" && game.type !== filters.type.toLowerCase()) return false;
      if (filters.minPlayers && game.max_players < filters.minPlayers) return false;
      if (filters.maxPlayers && game.min_players > filters.maxPlayers) return false;
      if (filters.publisher && !game.publisher.toLowerCase().includes(filters.publisher.toLowerCase())) return false;
      if (filters.descriptionWord && !game.description.some(d => d.toLowerCase().includes(filters.descriptionWord.toLowerCase()))) return false;
      if (filters.minTime && game.avg_play_time_minutes < filters.minTime) return false;
      if (filters.maxTime && game.avg_play_time_minutes > filters.maxTime) return false;

      return true;
    });
    setFilteredGames(filtered);
  };

  return (
    <main>
      <aside className="filters">
        <h2>Filtry</h2>
        <label>Najniższa cena:</label>
        <input type="number" step="0.01" min="0" onChange={(e) => setFilters({...filters, minPrice: e.target.value})} />
        
        <label>Najwyższa cena:</label>
        <input type="number" step="0.01" min="0" onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} />

        <label>Rodzaj:</label>
        <select onChange={(e) => setFilters({...filters, type: e.target.value})}>
          <option>Wszystkie</option>
          <option>Abstrakcyjna</option>
          <option>Ekonomiczna</option>
          <option>Karciana</option>
          <option>Kooperacyjna</option>
          <option>Przygodowa</option>
          <option>Rodzinna</option>
          <option>Towarzyska</option>
        </select>

        <label>Minimalna liczba graczy:</label>
        <input type="number" min="0" onChange={(e) => setFilters({...filters, minPlayers: e.target.value})} />
        
        <label>Maksymalna liczba graczy:</label>
        <input type="number" min="0" onChange={(e) => setFilters({...filters, maxPlayers: e.target.value})} />

        <label>Minimalny czas gry:</label>
        <input type="number" placeholder="w minutach" onChange={(e) => setFilters({...filters, minTime: e.target.value})} />
        
        <label>Maksymalny czas gry:</label>
        <input type="number" placeholder="w minutach" onChange={(e) => setFilters({...filters, maxTime: e.target.value})} />

        <label>Wydawca:</label>
        <input type="text" placeholder="np. Rebel" onChange={(e) => setFilters({...filters, publisher: e.target.value})} />

        <label>Słowo w opisie:</label>
        <input type="text" placeholder="np. fantastyka" onChange={(e) => setFilters({...filters, descriptionWord: e.target.value})} />

        <button className="search-button" onClick={handleSearch}>Szukaj</button>
      </aside>

      <section className="products">
        <div className="products-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Lista gier ({filteredGames.length})</h2>
          <Link href="/games/add">
            <button className="add-button" style={{ padding: '10px 20px', cursor: 'pointer', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}>
              + Dodaj grę
            </button>
          </Link>
        </div>

        <div className="product-list">
          {filteredGames.map((game) => (
            <Link href={`/games/${game.id}`} key={game.id} className="product-card-link">
              <article className="product-card">
                <h3>{game.title}</h3>
                <p><strong>Cena: {game.price_pln} zł</strong></p>
                <p>Gracze: {game.min_players}-{game.max_players}</p>
                <p>Czas: ~{game.avg_play_time_minutes} min</p>
                <p>{game.type}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}