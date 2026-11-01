import type { UserData } from '../../interfaces/UserData';

interface ProfileProps {
  currentUser: UserData | null;
  onAddCard: () => void;
  onEditProfile: () => void;
  onEditAvatar: () => void;
}

function Profile ({ currentUser, onAddCard, onEditProfile, onEditAvatar }: ProfileProps) {
    return (
         <section className="profile page__section">
          <div className="profile__avatar-container">
  <img className="logo profile__image"
        src={currentUser?.avatar}
        alt={currentUser?.name}/>

  <button
    className="profile__avatar-edit-button"
    type="button"
    aria-label="Editar avatar"
      onClick={onEditAvatar}>
  </button>
</div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser?.name}</h1>

            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{currentUser?.about}</p>
          </div>
          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
            onClick={onAddCard}
          ></button>
        </section>
    )
}
export default Profile