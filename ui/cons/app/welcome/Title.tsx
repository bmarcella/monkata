
import logoLight from "./logo-light.svg";
export default function Title() {
  return (
    <>
        <img src={logoLight} alt="logo" className="w-32 h-32" />
        <h1 className="text-3xl font-bold text-center mt-8 text-gray-500">Welcome to Monkata Console</h1>
        <p className="text-center mt-4">The ultimate solution for your business</p>
    </>
  )
}
