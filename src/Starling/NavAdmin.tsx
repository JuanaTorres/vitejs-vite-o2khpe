/**
 @autor Juan Castillo, Camila Lozano, Nicolas Peña y Juana Torres
 @version 1
 */
/**
 * Funcion de crear nav para administrador
 */
export default function Navbar() {
  return (
    <nav className="flex flex-row items-center text-left space-x-7 px-14 py-7 bg-lime-600">
      <img className="w-12" src="https://i.imgur.com/fgCWKft.png" />
      <a href="/">Home</a>
    </nav>
  );
};
