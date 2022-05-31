import emailjs from 'emailjs-com';
import Input from './Starling/Input';
import PrimaryButton from './Starling/PrimaryButton';
import RadioGroup from './Starling/RadioGroup';
import returnFormDataAsJson from './easyFormData'
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que contiene el formulario para el registro de capitanes
*/
export default function AppLogin() {
  var  state={
    email: "",
    asunto: "Bienvenido Capitan al Maratón",
    mensaje: "",
    id:"",
    nombre:"",
    lenguaje:""
  };

function enviarEmail(){
  modificarMensaje("Ahora eres el capitán del equipo y la Contraseña de equipo para ingresar es: XXX");

  emailjs.send("service_jnq30fj",
  "template_8v6pm8c", state,  "1-3Z2otRwnMoyN3op")
.then((response) => {
   console.log('SUCCESS!', response.status, response.text);
}, (err) => {
   console.log('FAILED...', err);
});
}

function modificarMensaje(m:any){
  state.mensaje= m;
}
function obtenerLenguaje(event:any){
    console.log(`Seleccionaste ${event.target.value}`);
    state.lenguaje= event.target.value;
    console.log(state);
}  
function obtenerNombre(event:any){
  console.log(`Seleccionaste ${event.target.value}`);
  state.nombre= event.target.value;
}
function obtenerEmail(event:any){
  console.log(`Seleccionaste ${event.target.value}`);
  state.email= event.target.value;
}
function obtenerID(event:any){
  console.log(`Seleccionaste ${event.target.value}`);
  state.id= event.target.value;
}  
let loginData: any;

const captureFormData = (e: any) => {
  e.preventDefault();
  let rawFormData = new FormData(e.target);
  loginData = returnFormDataAsJson(rawFormData);
  console.log(loginData.values());
};

return (
  <div className="p-3">
    <div className="bg-white p-5 max-w-md">
      <form onSubmit={captureFormData}>
        {[
          { pl: 'Número de Documento', name: 'id', type: 'text', icon: 'card' },
          { pl: 'Correo', name: 'email', type: 'email', icon: 'email' },
          { pl: 'Nombre', name: 'name', type: 'text', icon: 'user' },
        ].map((input) => (
          <Input
            placeholder={input.pl} type={input.type}
            name={input.name} iconType={input.icon} addStyle="mb-2"
          />
        ))}
        <RadioGroup list={['C', 'C++', 'Java']} />
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
);
}
