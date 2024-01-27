//Vamos a colocar todas las funciones asíncronas que hacen la comunicación con la base de datos y en los hooks vamos a llamar esas funciones.

//Servicio que se encarga de la comunicación con la base de datos

export const getAllPostsService = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/posts`, {
      method: "GET",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
    //mirar el backend, lo que devuelve
    return json.data;
  } catch (error) {
    console.error("Error al obtener los posts desde el frontend:", error);
    throw new Error("Error al obtener los posts desde el frontend");
  }
};

//Creamos un servicio para el registro de usuarios

export const registroUsuarioService = async ({

  userName,
  email,
  password,

}) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/user/register`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    }
  );
  //transformamos a json lo que reciba la petición
  const json = await response.json();
  // i si la response no es okay, lanzo un error
  if (!response.ok) {
    throw new Error(json.message);
  }
};


export const loginUsuarioService = async ({ email, password }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email, 
        password,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.data;
  } catch (error) {
    console.error("Error al iniciar sesión desde el frontend:", error);
    throw new Error("Error al iniciar sesión desde el frontend");
  }
};

// Función que realiza la búsqueda en el backend
export const searchService = async (term) => {
  try {
    // Codificar el término de búsqueda antes de incluirlo en la URL
    const encodedTerm = encodeURIComponent(term);

    // Realizar la solicitud GET al backend
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/post/search?filter=${encodedTerm}`, {
      method: "GET", // Método de la solicitud
    });

    // Verificar si la respuesta es exitosa 
    if (!response.ok) {
      throw new Error(`Error al buscar. Código ${response.status}`);
    }

    // Convertir la respuesta a formato JSON
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error al buscar:", error);
  }
};