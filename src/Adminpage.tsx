import React, {useState, useEffect} from 'react';
import DataTable1 from "react-data-table-component";
import PrimaryButton from "./Starling/PrimaryButton";

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
        .then(response => confirmarEliminacion(response.toString()))
        .catch(error => cathError(error));

}

/**
 * Funcion que verifica que todos los equipos fueron eliminados
 * @param m response del fetch
 */
function confirmarEliminacion(m: any) {
    if (m.includes("error") || m.includes("no han podido")) {
        alert(m);
        return;
    }
    window.location.reload();
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
   /* fetch("http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/equipos", {
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
        .then(response => confirmarEliminacion(response.toString()))
        .catch(error => cathError(error));*/
}

/**
 * Funcion que valida el rol del usuario en cookies
 */
function validarUsuario() {
    // @ts-ignore
    var username = atob(window.localStorage.getItem("user"));
    // @ts-ignore
    var password = atob(window.localStorage.getItem("psw"));
    let headers = new Headers();
    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', "Basic " + btoa(username + ":" + password));
    var url = "http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/usuario";
    fetch(url, {
        method: 'GET',
        headers: headers,
    }).then((response) => response.text()).then((response) => validarRol(response.toString()))
}

/**
 * Funcion que valida el rol del usuario con la pagina
 * @param rol response del fetch
 */
function validarRol(rol: any) {
    if (rol !== "ADMIN") {
        alert("Este usuario no tiene permisos de administrador!")
        window.location.href = "./login"
    }
}

/**
 * Función que retorna el html y componentes de las tablas Admin
 */
export default function Admin() {
    window.onload = validarUsuario;
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
            name: 'Clave',
            selector: (row: { clave: any; }) => row.clave,
            sortable: true,
        },

    ];
    const showData = async () => {
        // @ts-ignore
        var username = atob(window.localStorage.getItem("user"));
        // @ts-ignore
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
                <div className="max-w-md bg-white p-50000">
                    <h2 style={{color: "black"}}>Tabla de equipos</h2>
                    <DataTable1 id="eventsTable" data={users} columns={columns} className="table"
                                style={{color: "black"}} pagination/>
                    <PrimaryButton type="button" onClick={imprimirCSV} >Imprimir CSV
                    </PrimaryButton>
                    <br/>
                    <PrimaryButton type="button" onClick={EliminarEquipo} style={{color: "black"}}>Eliminar equipos
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
