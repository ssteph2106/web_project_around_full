import { useContext, useRef } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (avatarRef.current) {
      handleUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    }
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Enlace de la imagen"
        required
        type="url"
        ref={avatarRef}
      />

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditAvatar;