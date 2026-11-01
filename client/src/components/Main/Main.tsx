import { useContext } from 'react';
import type { PopupConfig } from '../../types/types';
import type { MainProps } from '../../interfaces/MainProps';
import Popup from './Popup/Popup';
import NewCard from './Popup/NewCard/NewCard';
import EditProfile from './Popup/EditProfile/EditProfile';
import EditAvatar from './Popup/EditAvatar/EditAvatar';
import Profile from '../Profile/Profile'
import CardList from '../CardList/CardList'
import ImagePopup from './Popup/ImagePopup/ImagePopup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.tsx'


function Main ({ cards, handleOpenPopup, handleClosePopup, popup, handleCardLike, handleCardDelete }: MainProps) {
const { currentUser } = useContext(CurrentUserContext);
  const newCardPopup: PopupConfig = {
  id: 'new-card',
  title: 'Nuevo lugar',
  children: <NewCard />,
};
const editProfilePopup: PopupConfig = {
  id: 'edit-profile',
  title: 'Editar perfil',
  children: <EditProfile />,
};
const editAvatarPopup: PopupConfig = {
  id: 'edit-avatar',
  title: 'Editar avatar',
  children: <EditAvatar />,
}

function handleOpenImagePopup(image: string, caption: string): void {
  handleOpenPopup({
    id: 'image-popup',
    title: 'Imagen',
    children: (
     <ImagePopup 
      image={image}
      caption={caption}
      />
    ),
  });
}
return (
      <main className="content">
        <Profile 
        currentUser={currentUser}
        onAddCard={() => handleOpenPopup(newCardPopup)}
        onEditProfile={() => handleOpenPopup(editProfilePopup)}
        onEditAvatar={() => handleOpenPopup(editAvatarPopup)}
        />
        <CardList 
        cards={cards}
        onCardClick={handleOpenImagePopup} 
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        />
        {popup && (
    <Popup
    title={popup.title}
    isOpen={popup !== null}
    onClose={handleClosePopup}
    isImage={popup.id === 'image-popup'}
  >
    {popup.children}
  </Popup>

)}
      </main>
  )
}
export default Main