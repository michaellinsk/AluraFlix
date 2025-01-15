import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <header className="z-1 w-full flex items-center justify-between p-4 gap-2 py-6 bg-zinc-950">
      <img src={logo} alt="Logo Aluraflix" width={120} />
      <div className=" flex gap-4">
        <Link
          to="/"
          className="text-center text-[#2371d1] font-bold w-28 border border-white py-1 px-2  rounded-md shadow-[inset_0_0_7px_2px_rgba(35,113,209,0.8)]"
        >
          Home
        </Link>
        <Link
          to="/criar-video"
          className="text-center text-white font-bold w-28 border border-white py-1 bg-transparent  text- rounded-md ]"
        >
          Novo video
        </Link>
      </div>
    </header>
  );
}
