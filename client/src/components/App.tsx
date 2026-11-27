import { useState, useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import {
  getAuthUser,
  login as loginRequest,
  register as registerRequest,
} from '../utils/auth';
import type { CardData } from '../interfaces/CardData';
import type { UserData } from '../interfaces/UserData';
import type { ModalData } from '../interfaces/ModalData';
import type { PopupConfig } from '../types/types';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from './InfoTooltip/InfoTooltip';
import  api  from '../utils/api';
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
const [currentUser, setCurrentUser] = useState<UserData | null>(null);
const [cards, setCards] = useState<CardData[]>([]);
const [modalData, setModalData] = useState<ModalData | null>(null);

const [isAuthLoading, setIsAuthLoading] = useState(true);

const navigate = useNavigate();

const [authMessage, setAuthMessage] = useState<{
  type: 'success' | 'error';
  text: string;
} | null>(null);

useEffect(() => {
  const token = localStorage.getItem('jwt');

  if(!token) {
    setIsAuthLoading(false)
    return;
  }
  getAuthUser(token)
  .then((user) => {
    setCurrentUser(user);
  })
  .catch((error) => {
    console.error('Error al restauras la sesión', error);
    localStorage.removeItem('jwt');
  })
  .finally(() => {
    setIsAuthLoading(false);
  })
}, []);

useEffect(() => {
  if (!currentUser?._id) {
    setCards([]);
    return;
  }

  api.getInitialCards()
    .then((initialCards) => {
      setCards(initialCards);
    })
    .catch(console.error);
}, [currentUser?._id]);


async function handleLogin(email: string, password: string) {
  setAuthMessage(null);

  try {
    const { token } = await loginRequest(email, password);
    localStorage.setItem('jwt', token);

    const user = await getAuthUser(token);
    setCurrentUser(user);
    navigate('/');

  } catch (error) {
    localStorage.removeItem('jwt');

    setAuthMessage({
      type: 'error',
      text: error instanceof Error
        ? error.message
        : 'No se pudo iniciar sesión.',
    });
  }
}

async function handleRegister(email: string, password: string) {
  setAuthMessage(null);

  try {
    await registerRequest(email, password);

    setAuthMessage({
      type: 'success',
      text: '¡Registro completado! Ahora puedes iniciar sesión.',
    });

    navigate('/signin');
  } catch (error) {
    setAuthMessage({
      type: 'error',
      text: error instanceof Error
        ? error.message
        : 'No se pudo completar el registro.',
    });
  }
}

function handleLogout() {
  localStorage.removeItem('jwt');
  setCurrentUser(null);
  setCards([]);
  setAuthMessage(null);
  navigate('/signin');
}

function handleClosePopup() {
  setModalData(null);
};

function handleOpenPopup(config: PopupConfig) {
setModalData(config);
};

async function handleCardLike (card: CardData) {
  let updatedCard: CardData;
  if (card.isLiked ) {
  updatedCard = await api.deleteCardLike(card._id)
  } else {
  updatedCard = await api.likeCard(card._id)
  } 
  const updatedCards = cards.map((c) => {
    if (c._id === card._id) {
      return updatedCard;
    }
    return c;
  });
  setCards(updatedCards);
};

async function handleCardDelete (card: CardData) {
 await api.deleteCard(card._id)
const removeCard = cards.filter((c) => {
    return c._id !== card._id 
  });
  setCards(removeCard);
};

async function handleUpdateUser(data: { name: string; about: string }) {
  setAuthMessage(null);

  try {
    const updatedUser = await api.editUserInfo(data);
    setCurrentUser(updatedUser);
    setModalData(null);
  } catch (error) {
    setAuthMessage({
      type: 'error',
      text: error instanceof Error
        ? error.message
        : 'No se pudo actualizar la información del usuario.',
    });
  }
};

async function handleUpdateAvatar(data: { avatar: string }) {
  try {
    const updatedUser = await api.updateAvatar(data);
    setCurrentUser(updatedUser);
    setModalData(null);
  } catch (error) {
    console.error(error);
  }
};

async function handleAddPlaceSubmit(data: { name: string; link: string }) {
  try {
    const newCard = await api.addCard(data);
    setCards((state) => [newCard, ...state]);
    setModalData(null);
  } catch (error) {
    console.error(error);
  }
}

return (
  <CurrentUserContext.Provider
  value={{
    currentUser,
    handleUpdateUser,
    handleUpdateAvatar,
    handleAddPlaceSubmit,
  }}
  >

 <div className="page__content">
      <Header
  email={currentUser?.email ?? null}
  onLogout={handleLogout}
/>

      <Routes>
        <Route
          path="/signin"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <Login
                onLogin={handleLogin}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <Register
                onRegister={handleRegister}
              />
            )
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute
              isLoggedIn={Boolean(currentUser)}
              isLoading={isAuthLoading}
            >
              <Main
                cards={cards}
                popup={modalData}
                handleOpenPopup={handleOpenPopup}
                handleClosePopup={handleClosePopup}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={currentUser ? "/" : "/signin"}
              replace
            />
          }
        />
      </Routes>
      {authMessage && (
  <InfoTooltip
    message={authMessage.text}
    isSuccess={authMessage.type === 'success'}
    onClose={() => setAuthMessage(null)}
  />
)}
      <Footer />
    </div>
  </CurrentUserContext.Provider>
);
}

export default App
