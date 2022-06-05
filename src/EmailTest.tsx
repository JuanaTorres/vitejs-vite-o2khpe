import React, {useState, useEffect} from 'react';
import Input from './Starling/Input';
import PrimaryButton from './Starling/PrimaryButton';
import RadioGroup from './Starling/RadioGroup';
import emailjs from 'emailjs-com';
import Navbar from "./Starling/Nav";
/**
 @autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
 @version 1
 */
/**
 * Form de agregar integrante y envio del correo de bienvenida
 */
export default function EmailTest() {
    window.onload = validarUsuario;


    var state = {
        email: "",
        asunto: "Bienvenido Integrante al Maratón",
        mensaje: "",
        id: "",
        nombre: "",
        lenguaje: "",
        idLenguaje: ""
    };

    /**
     * Función que realiza el fech y crea en el backend el integrante para redirigir al envio del correo
     */
    function enviarEmail() {
        // @ts-ignore
        var idCapitan = atob(window.localStorage.getItem("user"));

        var url = "http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/" + idCapitan + "/equipo/integrantes";
        var data = {
            "id": state.id,
            "nombre": state.nombre,
            "idLenguaje": state.idLenguaje,
            "email": state.email
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
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
            .then(response => modificarMensaje(response.toString()));
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
     * Función que modifica el mensaje y envia ese mensaje al correo del integrante
     * @param m mensaje de retorno del fech
     */
    function modificarMensaje(m: any) {

        if (m.includes("error") || m.includes("se encuentra")) {
            alert(m);
            window.location.reload();
            return;
        }
        state.mensaje = "Su contraseñan de equipo es: " + atob(m);

        emailjs.send("service_jnq30fj",
            "template_8v6pm8c", state, "1-3Z2otRwnMoyN3op")
            .then((response) => {
                if (response.status !== 200) {
                    cathError(response.text);
                    window.location.reload();
                }
                alert("Se a creado el integrante, revise el correo");
                window.location.href = "./integrante";
                //console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                cathError(err)
                window.location.reload();
            });
    }


    const captureFormData = (e: any) => {
        e.preventDefault();
        state.id = e.target.id.value;
        state.nombre = e.target.name.value;
        state.email = e.target.email.value;
        state.idLenguaje = e.target.radio1.value;
        // @ts-ignore
        state.lenguaje = document.getElementById(state.idLenguaje + "lb").textContent;
        enviarEmail();
    };
    const [lenguajes, setLenguajes] = useState([]);
    const showData = async () => {
        const response = await fetch('http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/usuario/lenguajes')
        const data = await response.json()
        setLenguajes(data)
    }
    useEffect(() => {
        showData()
    }, [])

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

    return (
        <div>
            <Navbar></Navbar>
            <h1 className="text-xl">Agregar un nuevo integrante
            </h1>
            <div className="flex flex-row items-center justify-center w-full h-full bg-transparent">
                <div className="px-5 py-5 bg-white rounded-md space-y-5">
                    <form onSubmit={captureFormData}>
                        {[
                            {pl: 'Número de Documento', name: 'id', type: 'text', icon: 'card'},
                            {pl: 'Correo', name: 'email', type: 'email', icon: 'email'},
                            {pl: 'Nombre', name: 'name', type: 'text', icon: 'user'},
                        ].map((input) => (
                            <Input key={input.name}
                                   placeholder={input.pl} type={input.type}
                                   name={input.name} iconType={input.icon} addStyle="mb-2"
                            />
                        ))}
                        <RadioGroup name="lenguaje" list={lenguajes}/>
                        <PrimaryButton type="submit" className="mb-2">Registrar</PrimaryButton>
                    </form>

                </div>
            </div>
        </div>
    );
}