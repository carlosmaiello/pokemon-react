import React from 'react';

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

export default Card;