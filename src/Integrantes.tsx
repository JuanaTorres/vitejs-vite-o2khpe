import NavCapitan from "./Navbar"
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que contiene las tablas de admin
*/

export var data = [
  {id: 1, nombre: 'Gob', correo: 'Bo@unbosque.co',lenguaje:"Java"},
  {id: 2, nombre: 'Gob', correo: 'Bo@unbosque.co',lenguaje:"Java"},
  {id: 3, nombre: 'Gob', correo: 'Bo@unbosque.co',lenguaje:"Java"}
];
export  function list(list:any){
  data=list;
}
function Eliminarintegrante(event:any){
  console.log(`Seleccionaste ${event.target.value}`);
  //rederigir back para eliminar imprime el id del integrante
}  
export default function Integrante() {
  return (
    <div>
      <NavCapitan/>
      <h1 style={{fontFamily:"initial"}}>Eliminar integrante
      </h1>
    <div className="p-3">
      <div className="bg-white p-5 max-w-md">
      <h2 style={{color:"black"}}>Tabla de Integrantes</h2>
        <table className="table" style={{color:"black"}} >
            <tr>
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Lenguaje</th>
                <th>Eliminar Integrante</th>
            </tr>
            {data.map((team, index) => {
            return <tr>
                <td>{team.id}</td>
                <td>{team.nombre}</td>
                <td>{team.correo}</td>
                <td>{team.lenguaje}</td>
                <td>
                <button type="button" value={team.id} onClick={Eliminarintegrante}>Eliminar
                </button>
                </td>
            </tr>
            })}
        </table>
      </div>
    </div>
    </div>
  );
}
