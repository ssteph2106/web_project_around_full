import type { CardData } from '../../interfaces/CardData';
import Card from '../Main/Card/Card';

interface CardListProps {
  cards: CardData[];
  onCardClick: (image: string, caption: string) => void;
  onCardLike: (card: CardData) => Promise<void>;
  onCardDelete: (card: CardData) => Promise<void>;
}

function CardList({ cards, onCardClick, onCardLike, onCardDelete }: CardListProps) {
  return (
    <section className="cards page__section">
      <ul className="cards__list">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
        ))}
      </ul>
    </section>
  );
}

export default CardList;