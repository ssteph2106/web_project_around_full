import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    handleAddPlaceSubmit({
      name,
      link,
    });
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Título"
        minLength={2}
        maxLength={30}
        required
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Enlace de la imagen"
        required
        type="url"
        value={link}
        onChange={(event) => setLink(event.target.value)}
      />

      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}

export default NewCard;