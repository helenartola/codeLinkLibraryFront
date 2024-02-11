import useFetchSuspense from "fetch-suspense"; 
import { useUser } from "../context/UserContext"; 

// Hook personalizado para hacer una solicitud GET con autenticación del usuario
export const useFetch = (url) => {
  const [user] = useUser();  // Obtenemos el usuario del contexto de usuario
  const headers = {}; // Inicializamos un objeto para los encabezados de la solicitud

  // Si hay un usuario, agregamos un encabezado de autorización con el token del usuario
  if (user) headers.Authorization = user.token;

  // Utilizamos la función useFetchSuspense para hacer la solicitud GET con los encabezados especificados
  return useFetchSuspense(url, { headers });
};

// Hook personalizado para hacer una solicitud POST con autenticación del usuario
export const useFetchPost = () => {
  const [user] = useUser(); 

  // Definimos una función asincrónica que toma una URL, un cuerpo y un método (POST por defecto)
  return async (url, body, method) => {
    const headers = {}; 

    // Si el cuerpo existe y no es una instancia de FormData, agregamos un encabezado "Content-Type" para indicar JSON
    if (body && !(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    // Si hay un usuario, agregamos un encabezado de autorización con el token del usuario
    if (user) headers.Authorization = user.token;

    // Realizamos la solicitud utilizando fetch con los encabezados y el cuerpo especificados
    const res = await fetch(url, {
      method: method || "POST", 
      headers,
      body: body && (body instanceof FormData ? body : JSON.stringify(body)), 
    });

    // Si la solicitud es exitosa, devolvemos el resultado en formato JSON
    if (res.ok) return await res.json();
    throw new Error(res.status);
  };
};

export default useFetch;

