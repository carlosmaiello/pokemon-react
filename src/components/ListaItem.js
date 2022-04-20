import React, { useEffect, useState } from 'react';
import { POKEMON_API } from '../settings';

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
            <img src={item.sprites.front_default} alt={item.name} />
            {pokemon.name}
        </div>
    )
}

export default ListaItem;

