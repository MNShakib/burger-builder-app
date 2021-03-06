import React from 'react';
import './Order.css';

const order = (props) => {
    const ingredients = [];

    for ( let ingredientsName in props.ingredients ) {
        ingredients.push( {
            name: ingredientsName,
            amount: props.ingredients[ ingredientsName]
        })
    }

    const ingredientsOutput = ingredients.map(ig => {
        return (<span key={ig.name}
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}>{ig.name} ({ig.amount})</span>)
    })

    return (
        <div className="Order">
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price <strong>Rs. {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;