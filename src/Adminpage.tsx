
import React, {useState, useEffect} from 'react';
import DataTable1 from "react-data-table-component";
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que contiene las tablas de admin
*/
var checkedRows = [];

function a(e: any) {
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


function EliminarEquipo(event:any) {
    console.log( );
    //rederigir back para eliminar
}

function imprimirCSV(event: any) {
    console.log(`Seleccionaste ${event.target.value}`);
    //rederigir para imprimir CSV de los equipos
}

export default function Admin() {

    const [users, setUsers] = useState([]);
    const columns = [
        {
            name: '',
            selector: row => <input type="checkbox" id={row.id} onClick={a}/>,
            sortable: true,
        },
        {
            name: 'ID Equipo',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Capitán',
            selector: row => row.nombreCapitan,
            sortable: true,
        },
        {
            name: 'Integrantes',
            selector: row => row.integrantes,
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true,
        },
        {
            name: 'Clave',
            selector: row => row.clave,
            sortable: true,
        },

    ];
    const showData = async () => {
        const response = await fetch('http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/equipos')
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
                                style={{color: "black"}} pagination="true" />
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
