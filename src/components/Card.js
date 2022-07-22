import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/card.css';

const convertValue = (total) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
};

const Card = (infoStock) => {
  const  { cd_acao, vl_fechamento, qtdPurchased, id } = infoStock;
  const history = useHistory();

  const saveStock = (path) => {

    return history.push(path);
  }

  return (
    <div className="card_data">
        <h3 className="card_title">{ cd_acao }</h3>
        <p className="card_description">{ qtdPurchased }</p>
        <p className="card_description">{ convertValue((Number(vl_fechamento) * Number(qtdPurchased))) }</p>
        <div>
          <button className="button--small" onClick={() => saveStock(`/buy/${id}`)}>
            C
          </button>
          <button className="button--small" onClick={() => saveStock(`/sell/${id}`)}>
            V
          </button>
        </div>
    </div>
  )
}

export default Card;