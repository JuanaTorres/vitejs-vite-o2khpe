
import Input from './Starling/Input';
import PrimaryButton from './Starling/PrimaryButton';
import RadioGroup from './Starling/RadioGroup';
import NavCapitan from "./Navbar"
import emailjs from 'emailjs-com';
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Form de agregar integrante y envio del correo de bienvenida
*/
export default function EmailTest() {
    var idCapitan=window.localStorage.getItem("users");
    var state = {
        email: "",
        asunto: "Bienvenido al Maratón",
        mensaje: "",
        id: "",
        nombre: "",
        lenguaje: ""
    };

    function enviarEmail() {

/*
    var url= "http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/equipos/"+idCapitan+"/equipo/integrantes";
    var data={
        "id": state.id,
        "nombre": state.nombre,
        "idLenguaje": state.lenguaje,
        "email": state.email
    }
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }'
    })
    .then((response) => response.text)
    .then(response => modificarMensaje(response));
*/

    }

    //ingresra el integrante y pasar al back, respuesta de creación de equipo e integrante
    function modificarMensaje(m: any) {
        state.mensaje ="Su contraseñan de equipo es: "+ m;

        emailjs.send("service_jnq30fj",
            "template_8v6pm8c", state, "1-3Z2otRwnMoyN3op")
            .then((response) => {
                alert("Se a creado el integrante")
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                alert("Ocurrio un error al enviar el correo, contactate con un asesor")
                console.log('FAILED...', err);
            });
    }


    const captureFormData = (e: any) => {
        e.preventDefault();
        state.id = e.target.id.value;
        state.nombre = e.target.name.value;
        state.email = e.target.email.value;
        state.lenguaje = e.target.Lang.value;
        console.log(state);
        //enviarEmail();
    };


    return (
        <div>
            <NavCapitan/>
            <div className="p-3">
                <div className="bg-white p-5 max-w-md">
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
                        <RadioGroup name="lenguaje" list={['C', 'C++', 'Java']}/>
                        <PrimaryButton type="submit" className="mb-2">Registrar</PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}