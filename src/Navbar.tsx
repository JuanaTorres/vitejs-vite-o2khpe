import React, {Component} from 'react';
import {MenuItems} from "./MenuItems"
import './Navbar.css'
/**
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1

*/
/**
 * Navegación del capitan
 * @param props componentes del html
 */
export default function Navbar(props:any) {
  let state ={
    clicked:false
  }
  function handleClick() {
    state.clicked= !state.clicked;
  };
  return(
      <nav className="NavbarItems">
        <h1 className="navbar-log" style={{fontFamily:"initial"}}>Bienvenido Capitan<i className="fas fa-computer-classic">
        </i>
        </h1>
        <div className="menu-icon" onClick={handleClick}>
          <i className={state.clicked ? 'fas fa-times' : 'fas fa-computer-classic'}></i>
        </div>
        <ul className={state.clicked ? 'nav-menu active' : 'nav-menu'}>
         
        {MenuItems.map((item, index)=>{
            return(
              <li key={index}>
                <a className={item.cName} href={item.url} >
                  {item.title}
                  </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
 }

