import React from 'react';

import RingSpinner from './RingSpinner';
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Componente de React que maneja el contenido de los botones básicos (Sin color de fondo)
*/
export default function BasicButton(props: any) {
  let DEFAULT_COLORS: string[] = ['white', 'gray'];

  let COLOR: string[] = props.color;

  let color: string[] = [];

  !props.color ? (color = DEFAULT_COLORS) : (color = COLOR);

  let style: string = `
  @apply
  cursor-pointer
  select-none appearance-none
  inline-flex px-3 py-2 w-auto items-center justify-center
  bg-${color[0]} hover:bg-${color[0]}-100
  border border-${color[1]}-200 rounded focus:border-${color[1]}-300
  text-sm font-medium text-${color[1]}-800
  focus:outline-none focus:ring-2 focus:ring-${color[1]}-300;
  transition`;

  const [spinnerClassName, setSpinnerClassName] = React.useState(
    'h-4 w-4 transition ease-in-out hidden opacity-0'
  );

  return (
    <button
      onClick={() =>
        setSpinnerClassName('h-4 w-4 transition ease-in-out animate-spin mr-2')
      }
      className={style}
    >
      <div className={spinnerClassName}>
        <RingSpinner color={props.spinnerColor} />
      </div>
      <span>{props.content}</span>
    </button>
  );
}
