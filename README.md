# CODELINKLIBRARY APP FRONT

## DESCRIPCIÓN DEL PROYECTO:

    El equipo D conformado por Ana, Toni, Helena y Cristina hemos desarrollado una plataforma para compartir y guardar enlaces de desarrollo web.

    En este repositorio hemos desarrollado la parte del "front-end" de nuestra APP.

    En esta aplicación web podremos crear un usuario introduciendo algunos campos obligatorios que luego podremos actualizar e incluso ampliar o cambiar la contraseña actual. Una vez registrado el usuario nos aparecerá la página de "Log In" donde introduciremos las credenciales que nos indican.

    Una vez dentro de la aplicación nos aparecerán los "posts" ya existentes, los cuales podremos comentar, dar "like" o guardar para nuestra biblioteca que tendremos en la página de usuario. Esta página principal también incluye una columna de "Trending Topics" con los post con más "likes" de la web y nuestro "avatar" justo encima de la opción de crear nuevo "post".

    Haciendo referencia al "header", tendremos acceso a la barra de búsqueda, donde a medida que escribimos aparecerán los posts existentes en la web y los botones de "Página de perfil", "Log Out" y la posibilidad de cambiar la apariencia de la web "Light Mode / Dark Mode".

    Por último, podremos acceder a nuestra página de perfil donde podremos cambiar nuestro avatar dentro de una selección, acceder a nuestra biblioteca de "posts" guardados, acceder a la página de ajustes (donde podremos añadir información de usuario o cambiar contraseña), eliminar usuario con doble confirmación y un historial de nuestros "posts" publicados.


## CARACTERÍSTICAS:

    - Desarrollo de la parte visual de la app (funcionalidad y apariencia).
    - Registro, login, ajustes y eliminación de usuario.
    - Avatares de usuario.
    - Creación, edición y eliminación de post.
    - Posibilidad de dar like a post de otros usuarios.
    - Posibilidad de comentar post, editar y borrar el comentario.
    - Posibilidad de guardar post de otros usuarios.
    - Visualización de post general.
    - Visualización de post concreto.
    - Visualización de post con resultados de búsqueda.
    - Visualización de posts de cada usuario.
    - Buscador.


## FUTURAS IMPLEMENTACIONES

    - Categorias: Añadir "tags" de categoria al crear el post.
    - Buscador: Búsqueda por categorias.


## DEPENDENCIAS:

### Dependencias Principales:

    - react                 (Biblioteca principal: para construir interfaces de usuario)
    - react-dom             (Métodos específicos del DOM: para interactuar con React)
    - react-router-dom      (Biblioteca de navegación gestión de rutas en apps React)


### Dependencias de Desarrollo:
    - types/react                       (Tipos TypeScript para React)
    - @types/react-dom                  (Tipos TypeScript para ReactDOM)
    - @vitejs/plugin-react              (Plugin de integración de React con Vite)
    - eslint                            (Herramienta de linting para mantener consistencia en el código)
    - eslint-plugin-react               (Reglas específicas de linting para React)
    - eslint-plugin-react-hooks         (Reglas de linting específicas para los hooks de React)
    - eslint-plugin-react-refresh       (Compatibilidad con el plugin React Refresh para desarrollo en caliente)
    - vite                              (Herramienta de construcción rápida para aplicaciones web modernas)


## Uso

Para ejecutar el proyecto:

- En la terminal / bash usar comando `npm run dev`.


# Comandos útiles

- Para revisar dependencias instaladas `npm list`.
- Para revisar dependencias instaladas de primer nivel `npm list --depth=0`.
- Para revisar dependencias en busca de vulnerabilidades conocidas utiliza `npm audit`.