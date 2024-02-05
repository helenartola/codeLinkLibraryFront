# CODELINKLIBRARY APP FRONT

## DESCRIPCIÓN DEL PROYECTO:

    El equipo D conformado por Ana, Tony, Helena y Cristina hemos desarrollado una plataforma para compartir y guardar enlaces de desarrollo web. 
    En este repositorio hemos desarrollado la parte del front-end de nuestra APP. 
    Trabajaremos junto con el repositorio de back-end para llegar al resultado final.


## CARACTERÍSTICAS:

    - Desarrollo de la parte visual de la app (funcionalidad y apariencia).
    - Registro, login, ajustes y eliminación de usuario.
    - Avatares de usuario.
    - Creación y eliminación de post.
    - Posibilidad de dar like a post.
    - Posibilidad de comentar post.
    - visibilización de post general.
    - Visibilización de post concreto.
    - Visibilización de post con resultados de busqueda.
    - Visibilización de posts de cada usuario.


## CONFIGURACIÓN INICIAL DEL PROYECTO: 🔴

1. Decidimos en común un primer diseño y estructura de nuestra APP(dejamos decisiones de mejora durante el desarrollo). 

2. Creamos repositorio en github.

3. Clonamos repositorio de github en una carpeta nueva en el pc (code-link-library-front, ejemplo) con el comando `git clone` + `url de repositorio en github`.

4. Iniciamos proyecto con el comando `npm init -y`. ❓

5. Instalamos dependencias con `npm install` o `npm i` (+ `react, react-dom, react-router-dom` y `dependencias de derarrollo`).

6. Modificamos el módulo `package.json` (`"type":"module"`), modificamos values de (`"name"`). ❓

7. Utilizamos el comando `npm run dev`.

8. Creamos módulo README.md con `touch README.md` (Descripción app).

9. Creamos estructura básica de carpetas(`src` y sus subcarpetas: `assets`,`components`, `context`, `hooks`, `pages` y `services`).

10. Creamos módulo en la carpeta raiz `index.html`. ❓

11. Creamos módulo ocultación archivos con `touch .gitignore`.

12. Configuramos variables de entorno en un archivo `.env`. (incluimos en `.gitignore`)

13. Creamos módulo de referencia `.env.example`. (dejamos solo datos de muestra)

14. Desarrollamos módulo principal `App.jsx` y `App.css`. 

15. Desarrollamos módulo `index.css` (con margin y padding 0, para dar total control de css a los demás módulos).

16. Desarrollamos módulo `main.jsx`. ❓

17. Desarrollamos módulo `homepage.jsx` y `homepage.css` como pagina principal de la app.

18. Desarrollamos componente `ThemeSwitcher.jsx` y `ThemeSwitcher.css` como temas de la app y `ThemeContext.jsx`.

18. Desarrollamos componente `header.jsx`.

19. Desarrollamos componente `footer.jsx`.

20. Desarrollamos módulo `PaginaRegistro.jsx` y componente `FormularioRegistro.jsx` (módulos de css incluidos).

21. Desarrollamos módulo `LoginPage.jsx` y componente `LogIn.jsx` (módulos de css incluidos).

22. Desarrollamos módulo `NotFoundPage.jsx` y `NotFoundPage.css`.

23. Desarrollamos módulo `ProfilePage.jsx` y `ProfilePage.css`.

24. Desarrollamos módulo `UserSettingsPage.jsx` y `UserSettingsPage.css` (junto con su componente `UserSettings.jsx`).

25. Desarrollamos hooks.

26. Desarrollamos `UserContext.jsx`.

27. Desarrollamos componente `Buscador.jsx` y `Buscador.css`.

28. Desarrollamos 

.......................❓

27. Realizamos pruebas de funcionamiento (una vez tenemos el mensaje de confirmación `Servidor corriendo en el puerto ❓`).


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

