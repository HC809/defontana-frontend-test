"use client";
import PokemonsPage from "./pokemons";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <PokemonsPage />
    </main>
  );
}
