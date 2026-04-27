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
    query: "",
    minTime: ""
  });

  const [filteredGames, setFilteredGames] = useState(gamesData.board_games);

  const handleSearch = () => {
    let filtered = gamesData.board_games.filter((game) => {
      const matchesPrice = (!filters.minPrice || game.price_pln >= filters.minPrice) &&
                           (!filters.maxPrice || game.price_pln <= filters.maxPrice);
      const matchesType = filters.type === "Wszystkie" || game.type.toLowerCase() === filters.type.toLowerCase();
      const matchesPlayers = (!filters.minPlayers || game.min_players >= filters.minPlayers) &&
                             (!filters.maxPlayers || game.max_players <= filters.maxPlayers);
      const matchesPublisher = !filters.publisher || game.publisher.toLowerCase().includes(filters.publisher.toLowerCase());
      const matchesQuery = !filters.query || game.description.some(d => d.toLowerCase().includes(filters.query.toLowerCase()));
      const matchesTime = !filters.minTime || game.avg_play_time_minutes >= filters.minTime;

      return matchesPrice && matchesType && matchesPlayers && matchesPublisher && matchesQuery && matchesTime;
    });
    setFilteredGames(filtered);
  };

  return (
    <main>
      <aside className="filters">
        <h2>Filtry</h2>
        <label>Najniższa cena:</label>
        <input type="number" onChange={(e) => setFilters({...filters, minPrice: e.target.value})} />
        
        <label>Najwyższa cena:</label>
        <input type="number" onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} />

        <label>Rodzaj:</label>
        <select onChange={(e) => setFilters({...filters, type: e.target.value})}>
          <option>Wszystkie</option>
          <option>Ekonomiczna</option>
          <option>Przygodowa</option>
          <option>Towarzyska</option>
          <option>Kooperacyjna</option>
          <option>Karciana</option>
        </select>

        <label>Słowo w opisie:</label>
        <input type="text" placeholder="np. fantastyka" onChange={(e) => setFilters({...filters, query: e.target.value})} />

        <button className="search-button" onClick={handleSearch}>Szukaj</button>
      </aside>

      <section className="products">
        <div className="products-header">
          <h2>Lista gier ({filteredGames.length})</h2>
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