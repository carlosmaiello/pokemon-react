import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"

const POKEMON_API = "https://pokeapi.co/api/v2";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    (
      async () => {
        const req = await fetch(`${POKEMON_API}/pokemon`);
        const data = await req.json();
        setNext(data.next);
        setPokemons(data.results);
      }
    )();

  }, []);

  const proximos = async () => {
    const req = await fetch(next);
    const data = await req.json();
    setNext(data.next);
    setPokemons([...pokemons, ...data.results]);
  }

  const selecionar = (pokemon) => {
    setPokemon(pokemon);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            {pokemon && (
              <Detalhe pokemon={pokemon} />
            )}
          </div>
          <div className="col-md-4 overflow-auto vh-100">
            <Lista pokemon={pokemon} pokemons={pokemons} onNext={proximos} onSelecionar={selecionar} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Lista({ pokemon, pokemons, onNext, onSelecionar }) {
  return (
    <div className="Lista">
      <div className="list-group">
        {pokemons.map(p => (
          <a key={p.name} className={'list-group-item list-group-item-action ' + (p == pokemon ? 'active' : '')} onClick={() => onSelecionar(p)}>
            <ListaItem pokemon={p} />
          </a>
        ))}
        <a className="list-group-item list-group-item-action" onClick={onNext}>Mais</a>
      </div>
    </div>
  )
}

function ListaItem({ pokemon }) {
  const [item, setItem] = useState();

  useEffect(() => {
    (
      async () => {
        const req = await fetch(`${POKEMON_API}/pokemon-form/${pokemon.name}/`);
        setItem(await req.json());
      }
    )();
  }, [pokemon]);

  if (!item) return "Carregando ...";

  return (
    <div>
      <img src={item.sprites.front_default} />
      {pokemon.name}
    </div>
  )
}

function Detalhe({ pokemon }) {
  const [item, setItem] = useState();

  useEffect(() => {
    (
      async () => {
        const req = await fetch(`${POKEMON_API}/pokemon-form/${pokemon.name}/`);
        setItem(await req.json());
      }
    )();
  }, [pokemon]);

  if (!item) return "Carregando ...";

  return (
    <div className="Detalhe">
      <Card pokemon={item} />
    </div>
  )
}

function Card({ pokemon }) {
  return (
    <div className="card">
      <img src={pokemon.sprites.front_default} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
      </div>
    </div>
  )
}

export default App;
