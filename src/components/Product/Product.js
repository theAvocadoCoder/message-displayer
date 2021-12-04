import React, { useReducer } from 'react';
import './Product.css';

const currencyOptions = {
    minFractionDig: 2,
    maxFractionDig: 2,
}

function getTotal(cart) {
    const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
    return total.toLocaleString(undefined, currencyOptions)
}

const products = [
    {
        emoji: '🍦',
        name: 'ice cream',
        price: 1000
    },
    {
        emoji: '🍕',
        name: 'pizza',
        price: 4500
    },
    {
        emoji: '🍔',
        name: 'burger',
        price: 3500
    },
    {
        emoji: '🌯',
        name: 'regular shawarma',
        price: 1500
    },
    {
        emoji: '🥙',
        name: 'deluxe shawarma',
        price: 2500
    },
    {
        emoji: '🍰',
        name: 'cake slice',
        price: 1000
    },
    {
        emoji: '🍗',
        name: 'drumstick',
        price: 500
    },
    {
        emoji: '🍾',
        name: 'drink',
        price: 1500
    },
]

function cartReducer(state, action) {
    switch (action.type) {
        case "add":
            return [...state, action.product];
        case "remove":
            const productIndex = state.findIndex(item => item.name === action.product.name);
            if (productIndex < 0) {
                return state;
            }
            const update = [...state];
            update.splice(productIndex, 1);
            return update;
        default: 
            return state;
    }
}

export default function Product() {
    
    const [cart, setCart] = useReducer(cartReducer, []);

    function add(product) {
        setCart({product, type: "add"});
    }

    function remove(product) {
        setCart({ product, type: 'remove' });
    }
    
    return(
        <div className="wrapper">
            <div className="header-info">
                <div>
                    Shopping Cart: {cart.length} total items.
                </div>
                <div>Total: {getTotal(cart)}</div>
            </div>
            
            <div className="body-products">
                {products.map(product => (
                    <div key={product.name}>
                        <div className="product">
                            <span role="img" aria-label={product.name}>{product.emoji}</span>
                        </div>
                        <div>{`${product.name.toUpperCase()}: =N= ${product.price}`}</div>
                        <button onClick={() => add(product)}>Add</button>    <button onClick={() => remove(product)}>Remove</button>
                    </div>
                ))}
            </div>
            
        </div>
    )
}