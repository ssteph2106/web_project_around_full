const AUTH_BASE_URL =
  "https://se-register-api.en.tripleten-services.com/v1";

interface AuthUser {
 _id: string,
 email: string,
}

interface AuthUserResponse {
  data: AuthUser;
}

interface AuthResponse {
  token: string;
}

async function checkResponse<T>(
  response: Response,
  errorMessages: Record<number, string> = {}
): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const message =
      errorMessages[response.status] ??
      'Ocurrió un error. Inténtalo de nuevo.';

    throw new Error(message);
  }

  return data as T;
}

export async function register(
  email: string,
  password: string
): Promise<unknown> {
  const response = await fetch(`${AUTH_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

return checkResponse<unknown>(response, {
  400: 'No se pudo completar el registro. Comprueba que el correo sea válido y que no esté registrado.',
});
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return checkResponse<AuthResponse>(response, {
  400: 'Introduce tu correo electrónico y contraseña.',
  401: 'El correo electrónico o la contraseña son incorrectos.',
});
}

export async function getAuthUser(token: string): Promise<AuthUser> {
  const response = await fetch(`${AUTH_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
const result = await checkResponse<AuthUserResponse>(response, {
  400: 'La sesión no es válida. Inicia sesión nuevamente.',
  401: 'Tu sesión ha caducado. Inicia sesión nuevamente.',
});

return result.data;
}
