
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que contiene las tablas de admin
*/

export var data = [
  {id: 1, capitan: 'Gob', integrante: '2',fecha:"12/10/22",clave: "1212"},
  {id: 2, capitan: 'Buster', integrante: '3',fecha:"12/10/22",clave: "1212"},
  {id: 3, capitan: 'George Michael', integrante: '1',fecha:"12/10/22",clave: "1212"}
];
export  function list(list:any){
  data=list;
}
function EliminarEquipo(event:any){
  console.log(`Seleccionaste ${event.target.value}`);
  //rederigir back para eliminar 
}  
function imprimirCSV(event:any){
  console.log(`Seleccionaste ${event.target.value}`);
  //rederigir para imprimir CSV de los equipos
}  
export default function Admin() {
  let state ={
    clicked:false
  }
  function handleClick() {
    state.clicked= !state.clicked;
  };
  return (
    <div>
      <nav className="NavbarItems">
        <h1 className="navbar-log" style={{fontFamily:"initial"}}>Bienvenido Administrador<i className="fas fa-computer-classic">
        </i>
        </h1>
        <div className="menu-icon" onClick={handleClick}>
          <i className={state.clicked ? 'fas fa-times' : 'fas fa-computer-classic'}></i>
        </div>
        <ul className={state.clicked ? 'nav-menu active' : 'nav-menu'}>
        <li>
          <a className="nav-links" href="/" >
            Home
          </a>
        </li>
        
        </ul>
      </nav>
    <h1 style={{fontFamily:"initial"}}>Equipos de Maratón de Programación
     </h1>
    <div className="p-3">
      <div className="bg-white p-5 max-w-md">
      <h2 style={{color:"black"}}>Tabla de equipos</h2>
      
        
        <table className="table" style={{color:"black"}} >
            <tr>
                <th>ID Equipo</th>
                <th>Capitán</th>
                <th>Integrantes</th>
                <th>Fecha</th>
                <th>Clave</th>
                <th>Boton Eliminar</th>
            </tr>
            {data.map((team, index) => {
            return <tr>
                <td>{team.id}</td>
                <td>{team.capitan}</td>
                <td>{team.integrante}</td>
                <td>{team.fecha}</td>
                <td>{team.clave}</td>
                <td>
                <button type="button" value={team.id} onClick={EliminarEquipo}>Eliminar
                </button>
                </td>
            </tr>
            })}
        </table>                    
       
      <button type="button"  onClick={imprimirCSV} style={{color:"black"}}>Imprimir CSV
      </button>
      </div>
    </div>
    </div>
  );
}
