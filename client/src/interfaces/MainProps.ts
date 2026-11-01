import type { CardData } from './CardData';
import type { PopupConfig } from '../types/types';

export interface MainProps {
    cards: CardData[];
    handleOpenPopup: (data: PopupConfig) => void;
    handleClosePopup: () => void;
    popup: PopupConfig | null;
    handleCardLike: (card: CardData) => Promise<void>;
    handleCardDelete: (card: CardData) => Promise<void>;
}