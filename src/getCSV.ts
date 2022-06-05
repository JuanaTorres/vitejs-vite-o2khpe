import { DataFrame, toCSV } from 'danfojs';
/**
 @autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
 @version 1
 */
/**
 * Funcion de descargar archivo CSV
 * @param data lista con los datos del csv
 */
export default function getCSV(data: any) {
  let testframe = new DataFrame(data);
  return toCSV(testframe, { download: true, fileName: "ListaAdmin" });
}
