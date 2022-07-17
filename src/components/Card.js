import React from 'react';
import '../styles/card.css';

const Card = (infoStock) => {
  const  { name, qtd, value } = infoStock;

  return (
    <div class="portfolio_data">
        <h3 class="portfolio_title">{ name }</h3>
        <p class="portfolio_description">{ qtd }</p>
        <p class="portfolio_description">{ value }</p>

        <button class="button button--flex">
            C/V
        </button>
    </div>
  )
}

export default Card;