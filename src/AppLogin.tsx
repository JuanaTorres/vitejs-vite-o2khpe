import Input from './Starling/Input';
import PrimaryButton from './Starling/PrimaryButton';

/**
 @autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
 @version 1
 */
/**
 * Componente de React que contiene el formulario para el inicio de sesión de capitanes
 */
export default function AppLogin() {

    const captureFormData = (e: any) => {
        e.preventDefault();
        let url = 'http://localhost:16163/MaratonProgramacion-1.0-SNAPSHOT/api/usuario';
        var id = e.target.id.value;
        var psw = e.target.clave.value;

        psw = btoa(psw);
        let headers = new Headers();
        headers.append('Content-Type', 'text/json');
        headers.append('Authorization', 'Basic ' + btoa(id + ':' + psw));

        fetch(url, {
            method: 'GET',
            headers: headers
        }).then((response) => {
            if (!response.ok) {
                cathError("Oh... usuario invalido");
                window.location.reload();
            }
            return response.text();
        })
            .then((response) => redirect(response.toString()));

        /**
         * Función que maneja el error del fetch
         * @param error error de fetch
         */
        function cathError(error: any) {
            e.target.id.value = "";
            e.target.clave.value = "";
            alert(error);
            return;
        }

        /**
         * Redirreciona a el usuario  su correspondiente pagina
         * @param response rol del usuario
         */
        function redirect(response: any) {
            if (response === "CAPITAN" || response === "ADMIN") {
                window.localStorage.setItem('user', btoa(id));
                window.localStorage.setItem('psw', btoa(psw));
                if (response === "CAPITAN")
                    window.location.href = "./capitan"
                else
                    window.location.href = "./admin"
            } else if (response === "INTEGRANTE") {
                alert("El integrante no tiene acceso a la pagina");
                window.location.reload();
            }
        }
    };


    return (
        <div className="flex flex-row justify-center w-full h-full bg-transparent">
            <div className="max-w-md p-5 bg-white h-52">
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
