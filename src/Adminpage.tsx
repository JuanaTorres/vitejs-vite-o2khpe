import DataTable1 from "react-data-table-component";

import "datatables.net";
import * as $ from "jquery";
import "datatables.net-dt";
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que contiene las tablas de admin
*/

let data;
let equiposele;
function fillTable(list) {
    console.log(list);
    data = ([
        {id: 1, capitan: 'Gob', integrante: '2', fecha: "12/10/22", clave: "1212"},
        {id: 2, capitan: 'Buster', integrante: '3', fecha: "12/10/22", clave: "1212"},
        {id: 3, capitan: 'George Michael', integrante: '1', fecha: "12/10/22", clave: "1212"}
    ])
    list = data;
    let table = document.getElementById("table");
    if (document.getElementById("tBody") !== null) {
        $('#myTable').remove();
        table.removeChild(document.getElementById("tBody"));
    }
    //create the body of the table
    let tBody = document.createElement("tbody");
    tBody.id = "tBody";
    if (list == "[]") {
        alert("No se encontró información");
    }
    for (let i = 0; i < list.length; i++) {
        const tr = document.createElement("tr");
        let select = document.createElement("input");
        select.id = "s";
        select.type = "radio";
        select.value = list[i]["id"];
        select.addEventListener("click", function () {
            equiposele=select.value;
        });
        console.log(select.value);
        let td = document.createElement("td");
        td.appendChild(select);
        tr.appendChild(td);
        for (const property in list[i]) {
            td = document.createElement("td");
            td.textContent = list[i][property];
            tr.appendChild(td);
        }
        tBody.appendChild(tr);
    }
    table.appendChild(tBody);
    $('#myTable');
}

function EliminarEquipo() {
    console.log( equiposele);
    //rederigir back para eliminar
}

function imprimirCSV(event: any) {
    console.log(`Seleccionaste ${event.target.value}`);
    //rederigir para imprimir CSV de los equipos
}

export default function Admin() {


    fetch('http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/equipos', {
        method: 'GET'
    })
        .then((response) => response.json())
        .then(response => fillTable(response));



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
                <div className="bg-white p-5 max-w-md">
                    <h2 style={{color: "black"}}>Tabla de equipos</h2>
                    <table keyField='id' id="table" className="display" style={{color: "black"}}>
                        <thead>
                        <tr>
                            <th scope="col"> Seleccionar</th>
                            <th scope="col">ID Equipo</th>
                            <th scope="col">Capitán</th>
                            <th scope="col">Integrantes</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Clave</th>
                        </tr>
                        </thead>
                    </table>
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
