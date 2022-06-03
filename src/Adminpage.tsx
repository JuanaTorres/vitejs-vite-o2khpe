import React, {useState, useEffect} from 'react';
import DataTable1 from "react-data-table-component";

/**
 @autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
 @version 1
 */
var checkedRows: { id: any; }[] = [];

/**
 * Función que guarda los equipos seleccionados a eliminar en checkedRows
 * @param e evento del checkbox
 */
function selecionarEquipos(e: any) {
    console.log(e.target.checked);
    if (e.target.checked) {
        checkedRows.push({id: e.target.id});
    } else {
        for (let i = 0; i < checkedRows.length; i++) {
            if (checkedRows[i].id == e.target.id) {
                checkedRows.splice(i, 1);
            }
        }
    }
    console.log(checkedRows);
};

/**
 * Función para eliminar equipos
 * @param event evento del boton eliminar
 */
function EliminarEquipo(event: any) {

    fetch("http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/equipos", {
        method: 'PUT',
        body: JSON.stringify(checkedRows), // checkedRows can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                cathError(response.text());
                window.location.reload();
            }
            return response.text()
        })
        .then(response => console.log(response.toString()))
        .catch(error => cathError(error));

}

/**
 * Función que maneja el error del fetch
 * @param error error de fetch
 */
function cathError(error: any) {
    alert(error);
    return;
}

/**
 * Funcion que imprime el archivo CSV
 * @param event
 */
function imprimirCSV(event: any) {
    console.log(`Seleccionaste ${event.target.value}`);
    //rederigir para imprimir CSV de los equipos
}

/**
 * Función que retorna el html y componentes de las tablas Admin
 */
export default function Admin() {

    const [users, setUsers] = useState([]);
    const columns = [
        {
            name: '',
            selector: (row: { id: string | undefined; }) => <input type="checkbox" id={row.id}
                                                                   onClick={selecionarEquipos}/>,
            sortable: true,
        },
        {
            name: 'ID Equipo',
            selector: (row: { id: string | undefined; }) => row.id,
            sortable: true,
        },
        {
            name: 'Capitán',
            selector: (row: { nombreCapitan: string | undefined; }) => row.nombreCapitan,
            sortable: true,
        },
        {
            name: 'Integrantes',
            selector: (row: { integrantes: string | undefined; }) => row.integrantes,
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: (row: { fecha: any; }) => new Date(row.fecha).toUTCString(),
            sortable: true,
        },
        {
            name: 'Clave',
            selector: (row: { clave: any; }) => row.clave,
            sortable: true,
        },

    ];
    const showData = async () => {
        var username = atob(window.localStorage.getItem("user"));
        var password = atob(window.localStorage.getItem("psw"));
        let headers = new Headers();

        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', "Basic " + btoa(username + ":" + password));

        const response = await
            fetch('http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/equipos', {headers: headers});
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }
    useEffect(() => {
        showData()
    }, [])
    let state = {
        clicked: false
    }

    function handleClick() {
        state.clicked = !state.clicked;
    };

    return (
        <div>
            <nav className="NavbarItems">
                <h1 className="navbar-log" style={{fontFamily: "initial"}}>Bienvenido Administrador<i
                    className="fas fa-computer-classic">
                </i>
                </h1>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={state.clicked ? 'fas fa-times' : 'fas fa-computer-classic'}></i>
                </div>
                <ul className={state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <a className="nav-links" href="/">
                            Home
                        </a>
                    </li>

                </ul>
            </nav>
            <h1 style={{fontFamily: "initial"}}>Equipos de Maratón de Programación
            </h1>
            <div className="p-3">
                <div className="bg-white p-50000 max-w-md">
                    <h2 style={{color: "black"}}>Tabla de equipos</h2>
                    <DataTable1 id="eventsTable" data={users} columns={columns} className="table"
                                style={{color: "black"}} pagination/>
                    <button type="button" onClick={imprimirCSV} style={{color: "black"}}>Imprimir CSV
                    </button>
                    <br/>
                    <button type="button" onClick={EliminarEquipo} style={{color: "black"}}>Eliminar equipos
                    </button>
                </div>
            </div>
        </div>
    );
}
