import Radio from './Radio';

/*
@autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
@version 1
Maneja y modifica los inputs 
*/
export default function RadioGroup(props: any) {
  return (
    <div className="grid grid-cols-2 justify-items-start mb-2">
      <span className="text-black">Lenguaje</span>
      <div className="flex flex-col space-y-2">
        {props.list.map((radio: any) => (
          <Radio key={radio["id"]} value={radio["id"]} id={radio["id"]} content={radio["descripcion"]} name="radio1" required />
        ))}
      </div>
    </div>
  );
}