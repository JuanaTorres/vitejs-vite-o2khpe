import React from 'react';

/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
*/
/**
 *
 * @param props componentes del html
 */
export default function StarlingModal(props: any) {
  return (
    //https://github.com/facebook/prop-types
    <div className="absolute bg-black/40 p-5 w-full h-full">
      <div className="text-black bg-white p-5 w-10/12">
        <div>{props.content}</div>
      </div>
    </div>
  );
}

/*
{props.buttons.map((button: any) => (
        <MynaButton content={button.content} />
      ))}
*/
