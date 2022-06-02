import NavCapitan from "./Navbar"
import React, {useState, useEffect} from 'react';
import DataTable1 from "react-data-table-component";
import * as $ from "jquery";
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que contiene las tablas de admin
*/
//data prueba
var data = [
    {id: 1, nombre: 'Gob', email: 'Bo@unbosque.co', lenguaje: "Java"},
    {id: 2, nombre: 'Gob', email: 'Bo@unbosque.co', lenguaje: "Java"},
    {id: 3, nombre: 'Gob', email: 'Bo@unbosque.co', lenguaje: "Java"}
];
function Eliminarintegrante(event: any) {
    var idIntegrante=event.target.value;
    console.log(`Seleccionaste ${event.target.value}`);

    /*
    var url= "http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/"+idCapitan+"/equipo/integrantes/"+idIntegrante;

    fetch(url, {
        method: 'PUT',
    })
    .then((response) => response.text)
    .then(response => console.log(response));
*/
}

export default function Integrante() {

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
            selector: (row: { id: string | number | readonly string[] | undefined; }) => <button type="button" value={row.id} onClick={Eliminarintegrante}>Eliminar
            </button>,
            sortable: true,
        },
    ];
    /*
    const cookies = new Cookies;
    const idCapitan=cookies.get('user');
    console.log(cookies.get('user'));
    var url= "http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/"+idCapitan+"/equipo/integrantes";

    const showData = async () => {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }
    useEffect(() => {
        showData()
    }, [])*/
    return (
        <div>
            <NavCapitan/>
            <h1 style={{fontFamily: "initial"}}>Eliminar integrante
            </h1>
            <div>
                <div>
                    <h2 style={{color: "black"}}>Tabla de Integrantes</h2>
                    <DataTable1 id="eventsTable" data={data} columns={columns} className="table"
                                style={{color: "black"}} pagination />
                </div>
            </div>
        </div>
    );
}
