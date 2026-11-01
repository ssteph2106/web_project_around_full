import { useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import type { CardData } from '../../../interfaces/CardData';

interface CardProps {
  card: CardData;
  onCardClick: (image: string, caption: string) => void;
  onCardLike: (card: CardData) => Promise<void>;
  onCardDelete: (card: CardData) => Promise<void>;
}

function Card({ card, onCardClick, onCardLike, onCardDelete }: CardProps) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card.link, card.name)}
      />

      {currentUser?._id === card.owner && (
  <button
    aria-label="Eliminar tarjeta"
    className="card__delete-button"
    type="button"
    onClick={() => onCardDelete(card)}
  />
)}

      <div className="card__description">
        <h2 className="card__title">
          {card.name}
        </h2>

        <button
          aria-label="Botón Me gusta"
          className={`card__like-button ${card.isLiked ? 'card__like-button_is-active' : ''}`}
          type="button"
          onClick={() => onCardLike(card)}
        />
      </div>
    </li>
  );
}

export default Card;