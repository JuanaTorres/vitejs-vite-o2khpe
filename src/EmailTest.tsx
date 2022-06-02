import Cookies from 'universal-cookie';
import Input from './Starling/Input';
import PrimaryButton from './Starling/PrimaryButton';
import RadioGroup from './Starling/RadioGroup';
import returnFormDataAsJson from './easyFormData'
import NavCapitan from "./Navbar"
import emailjs from 'emailjs-com';
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Form de agregar integrante y envio del correo de bienvenida
*/
export default function EmailTest() {
    const cookies = new Cookies;
    console.log(cookies.get('user'));
    var state = {
        email: "",
        asunto: "Bienvenido al Maratón",
        mensaje: "",
        id: "",
        nombre: "",
        lenguaje: ""
    };

    function enviarEmail() {
        modificarMensaje("La Contraseña de equipo es: XXX");

        emailjs.send("service_jnq30fj",
            "template_8v6pm8c", state, "1-3Z2otRwnMoyN3op")
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
    }

    //ingresra el integrante y pasar al back, respuesta de creación de equipo e integrante
    function modificarMensaje(m: any) {
        state.mensaje = m;
    }

    let loginData: any;

    const captureFormData = (e: any) => {
        e.preventDefault();
        state.id = e.target.id.value;
        state.nombre = e.target.name.value;
        state.email = e.target.email.value;
        state.lenguaje = e.target.Lang.value;
        console.log(state);
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