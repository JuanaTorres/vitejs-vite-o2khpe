import { DataFrame, toCSV } from 'danfojs';

export default function getCSV(data: any) {
  let testframe = new DataFrame(data);
  return toCSV(testframe, { download: true, fileName: "ListaAdmin" });
}
