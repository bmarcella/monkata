import logoLight from "../../welcome/logo-light.svg";
interface TitleProps {
  title?: string;
  subTitle?: string;
}
export default function Title( { title = "Bienvenu sur Monkata Console" , subTitle = "The ultimate solution for your business" }: TitleProps ) {
  return (
    <>
        <img src={ logoLight } alt="logo" className="w-32 h-32" />
        <h1 className="text-3xl font-bold text-center mt-8 text-gray-500"> { title } </h1>
        <p className="text-center mt-4"> { subTitle }</p>
    </>
  )
}
