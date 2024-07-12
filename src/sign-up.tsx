import { Lock, UserRoundPlus } from "lucide-react";

export function Signup() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[477px] w-full max-h-[549px] h-full bg-zinc-800 rounded-lg flex flex-col pt-6 px-4 pb-14">
        <img src="/logo.svg" alt="plann.er" className="self-center w-44" />
        <span className="mt-10 mb-4 font-bold ml-2">Cadastre-se!</span>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border border-zinc-700 items-center">
            <UserRoundPlus className="size-5 text-zinc-400 ml-4" />
            <input
              className="bg-transparent outline-none w-full"
              type="text"
              placeholder="E-mail"
            />
          </div>
          <div className="flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border border-zinc-700 items-center">
            <Lock className="size-5 text-zinc-400 ml-4" />
            <input
              className="bg-transparent outline-none w-full"
              type="text"
              placeholder="Senha"
            />
          </div>
        </div>
        <button className="w-full bg-lime-300 rounded-lg text-lime-950 text-base font-medium h-11 mt-auto">
          Login
        </button>
      </div>
    </div>
  );
}
