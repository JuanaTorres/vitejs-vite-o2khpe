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
    {id: 1, nombre: 'Gob', correo: 'Bo@unbosque.co', lenguaje: "Java"},
    {id: 2, nombre: 'Gob', correo: 'Bo@unbosque.co', lenguaje: "Java"},
    {id: 3, nombre: 'Gob', correo: 'Bo@unbosque.co', lenguaje: "Java"}
];
function Eliminarintegrante(event: any) {
    console.log(`Seleccionaste ${event.target.value}`);
    //rederigir back para eliminar imprime el id del integrante
}

export default function Integrante() {

    const [users, setUsers] = useState([]);
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.correo,
            sortable: true,
        },
        {
            name: 'Lenguaje',
            selector: row => row.lenguaje,
            sortable: true,
        },
        {
            name: 'Boton Eliminar',
            selector: row => <button type="button" value={row.id} onClick={Eliminarintegrante}>Eliminar
            </button>,
            sortable: true,
        },
    ];
    /*
    const showData = async () => {
        const response = await fetch('http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/equipos')
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
                                style={{color: "black"}} pagination="true" />
                </div>
            </div>
        </div>
    );
}
