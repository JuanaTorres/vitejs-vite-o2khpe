import React from 'react';

import RingSpinner from './RingSpinner';
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
*/

/**
 * Componente de React que maneja el contenido de los botones coloridos
 * @param props componentes del html
 */
export default function PrimaryButton(props: any) {
  let style: string = `
  @apply
  cursor-pointer
  select-none appearance-none
  inline-flex px-3 py-2 w-auto items-center justify-center
  bg-amber-700 hover:bg-yellow-800
  border border-yellow-700 hover:border-yellow-800 rounded focus:border-yellow-800
  text-sm font-medium text-yellow
  focus:outline-none focus:ring-2 focus:ring-yellow-300;
  transition`;

  const [spinnerClassName, setSpinnerClassName] = React.useState(
    'h-4 w-4 transition ease-in-out hidden opacity-0'
  );

  return (
    <button
      type={props.type}
      onClick={() =>
        setSpinnerClassName('h-4 w-4 transition ease-in-out animate-spin mr-2')
      }
      className={style}
    >
      <div className={spinnerClassName}>
        <RingSpinner color={props.spinnerColor} />
      </div>
      <span>{props.children}</span>
    </button>
  );
}
