import { useState, type SubmitEvent } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

type LoginProps = {
  onLogin: (email: string, password: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin(email, password);
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Inicia sesión</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />

        <button className="auth__button" type="submit">
          Iniciar sesión
        </button>
      </form>

      <p className="auth__caption">
        ¿Aún no eres miembro?{' '}
        <Link className="auth__link" to="/signup">
          Regístrate aquí
        </Link>
      </p>
    </main>
  );
}

export default Login;
