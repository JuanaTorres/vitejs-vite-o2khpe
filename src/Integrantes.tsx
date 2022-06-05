import NavCapitan from "./Navbar"
import React, {useState, useEffect} from 'react';
import DataTable1 from "react-data-table-component";
import Navbar from './Starling/Nav.tsx'
import * as $ from "jquery";

/**
 @autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
 @version 1
 */


/**
 * Funcion que elimina a los integrantes del equipo
 * @param event evento del boton eliminar
 */
function Eliminarintegrante(event: any) {
    var idIntegrante = event.target.value;
    console.log(`Seleccionaste ${event.target.value}`);
    // @ts-ignore
    var idCapitan = atob(window.localStorage.getItem("user"));
    if (idCapitan === idIntegrante) {
        alert("El capitan no puede ser eliminado,\n si el capitan desea ser eliminado hable con el administrador para eliminar el equipo");
    } else {
        var url = "http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/" + idCapitan + "/equipo/integrantes/" + idIntegrante;

        fetch(url, {
            method: 'PUT',
        })
            .then((response) => response.text)
            .then(response => confirmarEliminacion(response.toString()))
            .catch(error => cathError(error));
    }

}

/**
 * Funcion que verifica que todos los equipos fueron eliminados
 * @param m response del fetch
 */
function confirmarEliminacion(m: any) {
    if (m.includes("error") || m.includes("no encontrado")) {
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
    if (rol !== "CAPITAN") {
        alert("Este usuario no tiene permisos de capitán!")
        window.location.href = "./login"
    }
}

/**
 * Función con los componentes de tabla Integreantes
 */
export default function Integrante() {
    window.onload = validarUsuario;
    const [users, setUsers] = useState([]);
    const columns = [
        {
            name: 'Id',
            selector: (row: { id: any; }) => row.id,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: (row: { nombre: any; }) => row.nombre,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: (row: { email: any; }) => row.email,
            sortable: true,
        },
        {
            name: 'Lenguaje',
            selector: (row: { lenguaje: any; }) => row.lenguaje,
            sortable: true,
        },
        {
            name: 'Boton Eliminar',
            selector: (row: { id: string | number | readonly string[] | undefined; }) => <button type="button"
                                                                                                 value={row.id}
                                                                                                 onClick={Eliminarintegrante}>Eliminar
            </button>,
            sortable: true,
        },
    ];
    // @ts-ignore
    var idCapitan = atob(window.localStorage.getItem("user"));
    var url = "http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/" + idCapitan + "/equipo/integrantes";

    const showData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }
    useEffect(() => {
        showData()
    }, [])

    return (
        <div>
            <Navbar/>
            <h1 style={{fontFamily: "initial"}}>Eliminar integrante
            </h1>
            <div>
                <div>
                    <h2 style={{color: "black"}}>Tabla de Integrantes</h2>
                    <DataTable1 id="eventsTable" data={users} columns={columns} className="table"
                                style={{color: "black"}} pagination/>
                </div>
            </div>
        </div>
    );
}
