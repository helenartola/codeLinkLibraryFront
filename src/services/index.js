//Vamos a colocar todas las funciones asíncronas que hacen la comunicación con la base de datos y en los hooks vamos a llamar esas funciones.
//Servicio que se encarga de la comunicación con la base de datos y obtener todos los posts.
export const getAllPostsService = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/posts`, {
      method: "GET",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la lista de posts
    return json.data;
  } catch (error) {
    //console.error("Error al obtener los posts desde el frontend:", error);
    throw new Error("No se ha podido obtener la lista de posts");
  }
};

// Crear un nuevo post
export const createPostService = async (postData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la respuesta del servidor
    return json.data;
  } catch (error) {
    console.error("Error al crear un nuevo post desde el frontend:", error);
    throw new Error("Error al crear un nuevo post desde el frontend");
  }
};

// Obtener un post por su ID
export const getPostByIdService = async (postId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/posts/${postId}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la información del post individual
    return json.data;
  } catch (error) {
    console.error(
      `Error al obtener el post con ID ${postId} desde el frontend:`,
      error
    );
    throw new Error(
      `Error al obtener el post con ID ${postId} desde el frontend`
    );
  }
};

// Registrar un nuevo usuario
export const registroUsuarioService = async ({ userName, email, password }) => {
  try {
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
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la respuesta del servidor
    return json.data;
  } catch (error) {
    console.error(
      "Error al registrar un nuevo usuario desde el frontend:",
      error
    );
    throw new Error("Error al registrar un nuevo usuario desde el frontend");
  }
};

// Iniciar sesión de un usuario
export const loginUsuarioService = async ({ email, password }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la información del usuario logueado
    return json.data;
  } catch (error) {
    console.error("Error al iniciar sesión desde el frontend:", error);
    throw new Error("Error al iniciar sesión desde el frontend");
  }
};

// Realizar una búsqueda en el backend
export const searchService = async (term) => {
  try {
    // Codificar el término de búsqueda antes de incluirlo en la URL
    const encodedTerm = encodeURIComponent(term);

    // Realizar la solicitud GET al backend
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/post/search?filter=${encodedTerm}`,
      {
        method: "GET", // Método de la solicitud
      }
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error al buscar. Código ${response.status}`);
    }

    // Convertir la respuesta a formato JSON
    const json = await response.json();

    // Devolver los resultados de la búsqueda
    return json.data;
  } catch (error) {
    console.error("Error al buscar:", error);
  }
};
