// Servicio que se encarga de la comunicación con la base de datos y obtener todos los posts.
export const getAllPostsService = async (userid = 0) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/posts`, {
      method: "GET",
      headers: {
        userid: userid
      },
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

export const likePostService = async (postId, token) => {
  try {
    // Registra el token antes de realizar la solicitud
    console.log('Authorization Token in likePostService:', token);

    // Verifica que el token esté presente antes de la solicitud
    if (!token) {
      throw new Error("Token not available. User may not be authenticated.");
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND}/post/${postId}/like`, {
      method: "POST",
      headers: {
        "Authorization": token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la respuesta del servidor
    return {
      numLikes: json.data.numLikes,
      isLiked: json.data.isLiked,
    };
  } catch (error) {
    console.error("Error al dar/quitar like:", error);
    throw new Error("Error al dar/quitar like");
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

// Guardar un post
export const savePostService = async (postId, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/post/${postId}/save`, {
      method: "POST",
      headers: {
        "Authorization": token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la respuesta del servidor
    return json.data;
  } catch (error) {
    console.error("Error al guardar el post:", error);
    throw new Error("Error al guardar el post");
  }
};

// Eliminar un post guardado
export const unsavePostService = async (postId, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/post/${postId}/unsave`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la respuesta del servidor
    return json.data;
  } catch (error) {
    console.error("Error al eliminar el post guardado:", error);
    throw new Error("Error al eliminar el post guardado");
  }
};

// Eliminar un post
export const deletePostService = async (postId, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la respuesta del servidor
    return json.data;
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    throw new Error("Error al eliminar el post");
  }
};

export const deleteCommentService = async (postId, commentId, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/post/${postId}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la respuesta del servidor
    return json.data;
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    throw new Error("Error al eliminar el comentario");
  }
};

export const editCommentService = async (commentId, editedComment, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/post/comment/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(editedComment),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    // Devolver la respuesta del servidor
    return json.data;
  } catch (error) {
    console.error("Error al editar el comentario:", error);
    throw new Error("Error al editar el comentario");
  }
};
