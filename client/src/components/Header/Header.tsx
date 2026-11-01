
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

type HeaderProps = {
  email: string | null;
  onLogout: () => void;
};

function Header({ email, onLogout }: HeaderProps) {

  const location = useLocation();
const isLoginPage = location.pathname === '/signin';

  return (
    <header className="header page__section">
      <img
        className="logo header__logo"
        src={logo}
        alt="Logotipo Around The U.S."
      />

      <div className="header__auth">
        {email ? (
          <>
            <span className="header__email">{email}</span>
            <button
              className="header__logout"
              type="button"
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
  className="header__link"
  to={isLoginPage ? '/signup' : '/signin'}
>
  {isLoginPage ? 'Regístrate' : 'Iniciar sesión'}
</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
