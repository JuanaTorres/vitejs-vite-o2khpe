/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que maneja el contenido de los botones primarios (Coloridos)
*/
export default function PrimaryButton(props: any) {
  let style: string = `
  cursor-pointer
  select-none appearance-none
  inline-flex px-3 py-2 w-auto items-center justify-center
  bg-amber-700 hover:bg-yellow-800
  border border-yellow-700 hover:border-yellow-800 rounded focus:border-yellow-800
  text-sm font-medium text-white
  focus:outline-none focus:ring-2 focus:ring-yellow-300;
  transition ${props.addStyle}`;

  return (
    <button type={props.type} className={style}>
      <span>{props.children}</span>
    </button>
  );
}
