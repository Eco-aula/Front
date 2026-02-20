export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await fetch("/api/v1/users/1");

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Fetch failed with status:", response.status, response.statusText);
      throw new Error("Error al conectar con el servidor: " + response.statusText);
    }

    const user: User = await response.json();
    console.log("User received from server:", user);


    if (!user) {
      throw new Error("Email o contraseña incorrectos");
    }

    return user;
  } catch (error: any) {
    console.error("Network error or fetch failed:", error);
    throw error; // Repropagamos el error para que LoginForm lo maneje
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario: " + response.statusText);
    }

    const newUser: User = await response.json();
    console.log("User registered successfully:", newUser);
    return newUser;
  } catch (error: any) {
    console.error("Registration error:", error);
    throw error;
  }
};

