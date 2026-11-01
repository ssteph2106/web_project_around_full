import { useState, type SubmitEvent } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

type RegisterProps = {
  onRegister: (email: string, password: string) => void;
};

function Register({ onRegister }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>){
    event.preventDefault();
    onRegister(email, password);
  }

  return (
    <main className="auth">
      <h1 className="auth__title">Regístrate</h1>
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
          Registrarse
        </button>
      </form>

      <p className="auth__caption">
        ¿Ya eres miembro?{' '}
        <Link className="auth__link" to="/signin">
          Inicia sesión aquí
        </Link>
      </p>
    </main>
  );
}

export default Register;