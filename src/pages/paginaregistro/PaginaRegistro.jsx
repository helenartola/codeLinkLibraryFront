import "./PaginaRegistro.css";
import { useState } from "react";
import { registroUsuarioService } from "../../services";
export const PaginaRegistro = () => {
  //hacemos que todos los campos esten controlados por un estado
  //creamos un estado para cada uno de los campos del formulario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    //cancelamos el evento de envio con preventDefault
    e.preventDefault();
    setError("");
    //comprobamos que las password sean iguales
    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    //Hacemos un try catch porque nos vamos a comunicar con la base de datos y así controlamos nosotros los errores que puedan surgir
    try {
      await registroUsuarioService({ name, email, password: pass1 });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="cajaFormulario">
      <h1>REGISTRO</h1>
      {/* Gestionamos el envio con el evento handleForm */}
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="nombre">Nombre</label>
          {/* Creamos un evento dentro de cada uno de los inputs para que cuando se actualicen los campos, actualice el estado */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="apellido">Apellido</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            value={birthDate}
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            required
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="userName">Nombre de Usuario</label>
          <input
            value={userName}
            type="text"
            id="userName"
            name="userName"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="bio">Biografía</label>
          <textarea
            value={bio}
            id="bio"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </fieldset>

        <fieldset>
          <label htmlFor="email">Correo electrónico</label>
          <input
            value={email}
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="pass1">Contraseña</label>
          <input
            value={pass1}
            type="password"
            id="pass1"
            name="pass1"
            required
            onChange={(e) => setPass1(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="pass2">Repite la contraseña</label>
          <input
            value={pass2}
            type="password"
            id="pass2"
            name="pass2"
            required
            onChange={(e) => setPass2(e.target.value)}
          />
        </fieldset>

        <button className="botonRegistro">REGISTRAR</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};

export default PaginaRegistro;
