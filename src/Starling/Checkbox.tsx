/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que maneja el contenido y estilo de los checkbox de los formularios
*/
export default function Checkbox(props: any) {
  return (
    <div className="inline-flex items-center space-x-1.5">
      <input
        id="basic"
        type="checkbox"
        className="cursor-pointer rounded border-gray-300 text-lime-500 transition focus:ring-lime-400 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
      />
      <label
        htmlFor="basic"
        className="cursor-pointer truncate text-xs font-medium text-black"
      >
        {props.content}
      </label>
    </div>
  );
}
