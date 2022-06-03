/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que maneja el contenido y estilo de los checkbox de los formularios
*/
export default function Radio(props: any) {
    var lb=props.id+"lb";
    return (
        <div className="inline-flex items-center space-x-1.5">
            <input
                id={props.id}
                type="radio"
                name="radio1"
                value={props.id}
                className="cursor-pointer rounded-full border-gray-300 text-lime-500 transition focus:ring-lime-400 disabled:cursor-not-allowed disabled:bg-lime-200 disabled:opacity-75"
                required/>
            <label id={lb}
                   htmlFor={props.id}
                   className="cursor-pointer truncate text-xs font-medium text-black"
            >
                {props.content}
            </label>
        </div>
    );
}
