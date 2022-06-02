import Input from './Starling/Input';
import PrimaryButton from './Starling/PrimaryButton';
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que contiene el formulario para el inicio de sesión de capitanes
*/
export default function AppLogin() {

    const captureFormData = (e: any) => {
        e.preventDefault();
        let url = 'http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/login';
        var id = e.target.id.value;
        var psw = e.target.clave.value;

        if (id === "" || psw == "") {
            alert("Es necesario llenar los campos");
            return;
        }
        psw = btoa(psw);
        let headers = new Headers();
        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', 'Basic ' + btoa(id + ':' + psw));

        fetch(url, {
            method: 'GET',
            headers: headers
        }).then((response) => {
            if (!response.ok) {
                cathError(response.text());
                window.location.reload();
            }
            return response.text();
        })
            .then((response) => redirect(response.toString()))
            .catch(error => cathError(error));

        function cathError(error: any) {
            e.target.id.value = "";
            e.target.clave.value = "";
            alert(error);
            return;
        }

        function redirect(response: any) {
            if (response === "CAPITAN" || response === "ADMIN") {
                window.localStorage.setItem('user', btoa(id));
                window.localStorage.setItem('pws', psw);
                if (response === "CAPITAN")
                    window.location.href = "./capitan"
                else
                    window.location.href = "./admin"
            }
        }
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
