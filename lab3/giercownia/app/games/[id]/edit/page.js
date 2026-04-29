"use client";
import { useState, use, useEffect } from "react";
import gamesData from "@/data/board-games.json";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GameForm({ params }) {
  const router = useRouter();
  const resolvedParams = params ? use(params) : null;
  const isEditMode = !!resolvedParams?.id;

  const [formData, setFormData] = useState({
    title: "",
    price_pln: "",
    type: "ekonomiczna",
    min_players: 1,
    max_players: "",
    avg_play_time_minutes: 60,
    publisher: "",
    is_expansion: false,
    description: ""
  });

  useEffect(() => {
    if (isEditMode) {
      const game = gamesData.board_games.find(g => g.id === parseInt(resolvedParams.id));
      if (game) {
        setFormData({
          ...game,
          description: game.description.join("\n") // textarea
        });
      }
    }
  }, [isEditMode, resolvedParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dane do zapisu (tymczasowe):", {
      ...formData,
      id: isEditMode ? parseInt(resolvedParams.id) : Date.now(), //data jako id
      description: formData.description.split("\n") // tak jak w json
    });
    alert(isEditMode ? "Zaktualizowano (log w konsoli)" : "Dodano nową grę (log w konsoli)");
    router.push("/");
  };

  return (
    <main style={{ padding: "20px", margin: "auto" }}>
      <h1>{isEditMode ? "Edytuj grę" : "Dodaj nową grę"}</h1>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <label>Tytuł gry:</label>
        <input type="text" value={formData.title} required
          onChange={(e) => setFormData({...formData, title: e.target.value})} />

        <div>
        <label>Cena (PLN):</label>
        <input type="number" step="0.01" min="0.01" value={formData.price_pln} required
            onChange={(e) => setFormData({...formData, price_pln: e.target.value})} />
        </div>

        <div>
        <label>Typ:</label>
        <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <option>Abstrakcyjna</option>
              <option>Ekonomiczna</option>
              <option>Karciana</option>
              <option>Kooperacyjna</option>
              <option>Przygodowa</option>
              <option>Rodzinna</option>
              <option>Towarzyska</option>
            </select>
        </div>
        
        <div>
        <label>Min. graczy:</label>
        <input type="number"  min="1" value={formData.min_players} required
            onChange={(e) => setFormData({...formData, min_players: e.target.value})} />
        </div>

        <div>
          <label>Max. graczy:</label>
          <input type="number" min="1" value={formData.max_players} required
              onChange={(e) => setFormData({...formData, max_players: e.target.value})} />
        </div>

        <div>
          <label>Średni czas gry (min):</label>
          <input type="number" min="1" value={formData.avg_play_time_minutes} required
            onChange={(e) => setFormData({...formData, avg_play_time_minutes: e.target.value})} />
        </div>

        <div>
          <label>Wydawca:</label>
          <input type="text" value={formData.publisher} 
            onChange={(e) => setFormData({...formData, publisher: e.target.value})} />
        </div>

        <div>
          <label>
            <input type="checkbox" checked={formData.is_expansion}
              onChange={(e) => setFormData({...formData, is_expansion: e.target.checked})} />
            To dodatek
          </label>
        </div>

        <div>
          <label>Opis:</label>
          <textarea rows="5" value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>


        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
          <button type="submit" style={{ padding: "10px", background: "#27ae60", color: "white", border: "none", cursor: "pointer" }}>
            Zapisz zmiany
          </button>
          <Link href="/">
            <button type="button" style={{padding: "10px", background: "#e74c3c", color: "white", border: "none", cursor: "pointer" }}>
              Anuluj
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
}