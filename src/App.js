import { useCallback, useEffect, useState } from "react";

function App() {
  // declaración de constantes para la llamada
  const urlAPI = "http://localhost:3001/articulos/";
  const [arrayListado, setArrayListado] = useState([]);

  // llamada (get) a la api
  const llamadaAPI = async () => {
    const resp = await fetch(urlAPI);
    const datosResp = await resp.json();
    setArrayListado(datosResp);
  };
  useEffect(() => {
    llamadaAPI();
  }, []);

  // post request --> añadir
  const anyadirArticulo = useCallback(async () => {
    const resp = await fetch(urlAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: "raul",
        precio: 1.99,
        comprado: false,
      }),
    });
    console.log(await resp.json());
  }, []);

  // delete request con parámetro --> eliminar
  const eliminarArticulo4 = useCallback(async (id) => {
    const resp = await fetch(urlAPI + id, { method: "DELETE" });
  }, []);

  // delete request sin parámetro (dentro del componente con el que se hace el map) --> eliminar
  const eliminarArticulo = useCallback(async () => {
    const resp = await fetch(urlAPI + "4", { method: "DELETE" });
  }, []);

  // put request --> editar
  const editarArticulo = useCallback(async () => {
    const resp = await fetch(urlAPI + "2", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: "raul",
        precio: 1.99,
        comprado: false,
      }),
    });
    console.log(await resp.json());
  }, []);

  return (
    <>
      <ul>
        {arrayListado.map((articulo) => (
          <li key={articulo.id}>
            {articulo.nombre}
            {articulo.precio}
          </li>
        ))}
      </ul>
      <button type="button" onClick={anyadirArticulo}>
        Añadir
      </button>
      <button type="button" onClick={editarArticulo}>
        Editar
      </button>
      <button type="button" onClick={() => eliminarArticulo4(4)}>
        Eliminar
      </button>
      <button type="button" onClick={eliminarArticulo}>
        Eliminar
      </button>
    </>
  );
}

export default App;
