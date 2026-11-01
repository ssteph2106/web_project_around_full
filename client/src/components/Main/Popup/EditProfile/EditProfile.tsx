import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || '');
  const [description, setDescription] = useState(currentUser?.about || '');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    handleUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Nombre"
        minLength={2}
        maxLength={40}
        required
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        className="popup__input popup__input_type_description"
        name="about"
        placeholder="Acerca de mí"
        minLength={2}
        maxLength={200}
        required
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditProfile;