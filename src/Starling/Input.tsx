import React from 'react';
import FontAwesomeIcon from '../FontAwesomeIcon';
/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1*/
/**
 * Funcion que maneja y modifica los inputs
 * @param props componentes del html
 */
export default function ArtemisaInput(props: any) {
  let style: string = `text-black text-left w-full space-y-0.5 ${props.addStyle}`;

  const [iconClassName, setIconClassName] = React.useState(
    `pointer-events-none absolute transition inset-y-0 left-0 flex items-center px-3 border-r`
  );

  return (
    <div className={style}>
      <div className="relative">
        <div id="icon" className={iconClassName}>
          <FontAwesomeIcon
            iconType={props.iconType}
            addStyle="fill-[#555] stroke-[#555]"
          />
        </div>
        <input
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          //Permite que a la hora de seleccionar el login se vea en verde
          onFocus={() =>
            setIconClassName(
              `pointer-events-none absolute transition inset-y-0 left-0 flex items-center px-3 border-r border-lime-500`
            )
          }
          onBlur={() =>
            setIconClassName(
              `pointer-events-none absolute transition inset-y-0 left-0 flex items-center px-3 border-r`
            )
          }
          className="block w-full pl-12 border-gray-200 rounded-md text-md transition pl-14 focus:border-lime-500 focus:ring-lime-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
          required/>
      </div>
    </div>
  );
}
