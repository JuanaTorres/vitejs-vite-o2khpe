import Input from './Starling/Input';
import PrimaryButton from './Starling/PrimaryButton';
import BasicButton from './Starling/BasicButton';
import Modal from './Starling/Modal';
import returnFormDataAsJson from './easyFormData';
import Cookies from 'universal-cookie';
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que contiene el formulario para el inicio de sesión de capitanes
*/
export default function AppLogin() {
    let loginData: any;

    const captureFormData = (e: any) => {
        e.preventDefault();
        const cookies = new Cookies;
        var result;
        let url =
            'http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/login';
        var id = e.target.id.value;
        var psw = e.target.clave.value;
        let headers = new Headers();
        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', 'Basic ' + btoa(id + ':' + psw));

        fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.text())
            .then((response) => result = (response.toString()));
        if (result == "CAPITAN" || result == "ADMIN") {
            cookies.set('user', id, {path: '/'});
            console.log(cookies.get('user'));
        }
        //prueba sin confirmación; falta el cifrado de base64
        cookies.set('user', id, {path: '/'});
        console.log(cookies.get('user'));
        console.log(psw);
    };

    return (
        <div className="w-full flex h-full flex-row justify-center content-center bg-transparent">
            <div className="bg-white p-5 h-52 max-w-md">
                <form onSubmit={captureFormData}>
                    {[
                        {
                            pl: 'Número de documento',
                            name: 'id',
                            type: 'text',
                            icon: 'card',
                        },
                        {pl: 'Clave', name: 'clave', type: 'password', icon: 'lock'},
                    ].map((input) => (
                        <Input
                            key={input.name}
                            placeholder={input.pl}
                            type={input.type}
                            name={input.name}
                            iconType={input.icon}
                            addStyle="mb-2"
                        />
                    ))}
                    <PrimaryButton type="submit" content="Entrar" addStyle="mb-2"/>
                </form>
                <div className="text-sm text-black">
                    ¿No estás registrado como capitán?{' '}
                    <a href="/register" className="text-blue-500 underline">
                        Regístrate aquí
                    </a>
                </div>
            </div>
        </div>
    );
}
