"use client";
import { useState } from "react";
import Link from "next/link";
import gamesData from "@/data/board-games.json"; // baza gier w pliku

export default function Home() {
  const allGames = gamesData.board_games;
  const [filteredGames, setFilteredGames] = useState(allGames);
  const [filters, setFilters] = useState({
    maxPrice: "",
    type: "Wszystkie",
    minPlayers: "",
    search: ""
  });

  const handleFilter = () => {
    const result = allGames.filter(game => {
      const matchPrice = filters.maxPrice === "" || game.price_pln <= parseFloat(filters.maxPrice);
      const matchType = filters.type === "Wszystkie" || game.type.toLowerCase() === filters.type.toLowerCase();
      const matchPlayers = filters.minPlayers === "" || (game.min_players <= parseInt(filters.minPlayers) && game.max_players >= parseInt(filters.minPlayers));
      const matchSearch = filters.search === "" || 
        game.description.join(" ").toLowerCase().includes(filters.search.toLowerCase()) || 
        game.title.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchPrice && matchType && matchPlayers && matchSearch;
    });
    setFilteredGames(result);
  };

  return (
    <main>
      <aside className="filters">
        <h2>Filtry</h2>
        
        <label>Najwyższa cena:</label>
        <input 
          type="number" 
          placeholder="np. 200" 
          value={filters.maxPrice} 
          onChange={e => setFilters({...filters, maxPrice: e.target.value})} 
        />

        <label>Rodzaj:</label>
        <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
          <option>Wszystkie</option>
          <option>ekonomiczna</option>
          <option>przygodowa</option>
          <option>abstrakcyjna</option>
          <option>rodzinna</option>
          <option>towarzyska</option>
          <option>kooperacyjna</option>
          <option>karciana</option>
        </select>

        <label>Minimalna liczba graczy:</label>
        <input 
          type="number" 
          placeholder="np. 2" 
          value={filters.minPlayers} 
          onChange={e => setFilters({...filters, minPlayers: e.target.value})} 
        />

        <label>Słowo w opisie:</label>
        <input 
          type="text" 
          placeholder="np. fantastyka" 
          value={filters.search} 
          onChange={e => setFilters({...filters, search: e.target.value})} 
        />

        <button className="search-button" onClick={handleFilter}>Szukaj</button>
      </aside>

      <section className="products">
        <div className="products-header">
          <h2>Lista gier ({filteredGames.length})</h2>
          <button className="add-button">Dodaj grę</button>
        </div>

        <div className="product-list">
          {filteredGames.map(game => (
            <Link href={`/games/${game.id}`} key={game.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="product-card">
                <h3>{game.title}</h3>
                <p>{game.description[0]}</p>
                <p>Gracze: {game.min_players}-{game.max_players}</p>
                <p>Czas: {game.avg_play_time_minutes} min</p>
                <p style={{fontWeight: 'bold', color: 'var(--search-col)'}}>Cena: {game.price_pln} zł</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}