// Servicio que se encarga de la comunicación con la base de datos y obtener todos los posts.
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
    console.error("Error al obtener los posts:", error);
    throw new Error("No se ha podido obtener la lista de posts");
  }
};

// Crear un nuevo post
export const createPostService = async (postData, token) => {
  try {
    // Imprime el token en la consola
    console.log('Authorization Token in createPostService:', token);

    const response = await fetch(`${import.meta.env.VITE_BACKEND}/post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": token, 
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
    console.error("Error al crear un nuevo post:", error);
    throw new Error("Error al crear un nuevo post");
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
      `Error al obtener el post con ID ${postId}:`,
      error
    );
    throw new Error(
      `Error al obtener el post con ID ${postId}`
    );
  }
};

// Obtener los comentarios de un post por su ID
export const getCommentsService = async (postId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/post/${postId}/comments`,
      {
        method: "GET",
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la lista de comentarios
    return json.data;
  } catch (error) {
    console.error(`Error al obtener los comentarios del post ${postId}:`, error);
    throw new Error(`Error al obtener los comentarios del post ${postId}`);
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
      "Error al registrar un nuevo usuario:",
      error
    );
    throw new Error("Error al registrar un nuevo usuario");
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
    //console.error("Error al iniciar sesión:", error);
    throw new Error("Credenciales incorrectas");
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

export const getInfoUserService = async (user) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/user/${user.userId}`, // Endpoint para obtener la información del usuario
      {
        method: "GET",
        headers: {
          Authorization: user.token // Agrega el token de autenticación
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la información del usuario
    return json.data;
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
    throw new Error("Error al obtener la información del usuario");
  }
};

// Obtener los posts de un usuario por su ID (sin autenticación)
export const getUserPostsService = async (userId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/posts/user/${userId}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la lista de posts del usuario
    return json.data;
  } catch (error) {
    console.error("Error al obtener los posts del usuario:", error);
    throw new Error("Error al obtener los posts del usuario");
  }
};

export const createCommentService = async ({ postId, comentario }, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/post/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          postId: postId, 
          text: comentario,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.data;
  } catch (error) {
    console.error("Error al crear un nuevo comentario:", error);
    throw new Error("Error al crear un nuevo comentario");
  }
};

