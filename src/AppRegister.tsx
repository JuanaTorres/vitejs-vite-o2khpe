import emailjs from 'emailjs-com';
import Input from './Starling/Input';
import PrimaryButton from './Starling/PrimaryButton';
import RadioGroup from './Starling/RadioGroup';
import {useEffect, useState} from "react";
/**
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
*/
/**
 * Componente de React que contiene el formulario para el registro de capitanes
 */
export default function AppLogin() {
    var state = {
        email: "",
        asunto: "Bienvenido Capitan al Maratón",
        mensaje: "",
        id: "",
        nombre: "",
        lenguaje: "",
        idLenguaje: ""
    };

    /**
     * Funcion que realiza el fech para crear el capitan y redirije para enviar el correo
     */
    function enviarEmail() {

        var url = "http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/capitanes";
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
            .then(response => modificarMensaje(response.toString()))
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
     * Se obtiene el mensaje del fetch y se envia al correo del capitan
     * @param m
     */
    function modificarMensaje(m: any) {

        if (m.includes("error") || m.includes("se encuentra")){
            alert(m);
            return;
        }

        state.mensaje = "Su contraseñan de equipo es: " + m;

        emailjs.send("service_jnq30fj",
            "template_8v6pm8c", state, "1-3Z2otRwnMoyN3op")
            .then((response) => {
                if (response.status !== 200){
                    cathError(response.text);
                    window.location.reload();
                }
                alert("Se a creado el capitan, revise el correo");
                window.location.href = "./";
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
        console.log(state);
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
    return (
        <div className="flex flex-col w-full h-screen">
        <div className="flex flex-row items-center justify-center w-full h-full bg-transparent">
            <div className="px-5 py-5 bg-white rounded-md space-y-5">
                <form className="space-y-5" onSubmit={captureFormData}>
                    {[
                        {pl: 'Número de Documento', name: 'id', type: 'text', icon: 'card'},
                        {pl: 'Correo', name: 'email', type: 'email', icon: 'email'},
                        {pl: 'Nombre', name: 'name', type: 'text', icon: 'user'},
                    ].map((input) => (
                        <Input key={input.name}
                               placeholder={input.pl} type={input.type}
                               name={input.name} iconType={input.icon} required
                        />
                    ))}
                    <RadioGroup key="12" list={lenguajes} required/>
                    <PrimaryButton key="button" type="submit" addStyle="mt-2 mb-2">Registrar</PrimaryButton>
                </form>
                <div className="text-sm text-black">
                    {'¿Ya estás registrado? '}
                    <a href="/login" className="text-blue-500 underline">
                        ¡Inicia sesión!
                    </a>
            </div>
        </div>
        </div>
        </div>
    );
}
