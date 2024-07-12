import { Lock, Mail, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import classNames from "classnames"

export function Signup() {
  const [email, setEmail] = useState("");

  const [emailFocus, setEmailFocus] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    const validateEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/;

    if (emailFocus || email) {
        setIsEmailValid(validateEmail.test(email));
    }
  }, [emailFocus, email]);
  
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[485px] w-full max-h-[641px] h-full bg-zinc-800 rounded-lg flex flex-col pt-6 px-4 pb-14">
        <img src="/logo.svg" alt="plann.er" className="self-center w-44" />
        <span className="mt-10 mb-4 font-bold ml-2">Cadastre-se!</span>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border border-zinc-700 items-center">
            <UserRoundPlus className="size-5 text-zinc-400 ml-4" />
            <input
              className="bg-transparent outline-none w-full"
              type="text"
              placeholder="Seu nome completo"
            />
          </div>
          
          <div className={classNames(
            "flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border items-center",
            {
                "border-zinc-700": isEmailValid,
                "border-red-500": !isEmailValid
            }
          )}>
            
            <Mail className="size-5 text-zinc-400 ml-4" />
            <input
            
              className="bg-transparent outline-none w-full"
              type="e-mail"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>
          <div className="flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border border-zinc-700 items-center">
            <Lock className="size-5 text-zinc-400 ml-4" />
            <input
              className="bg-transparent outline-none w-full"
              type="password"
              placeholder="Senha"
            />
          </div>
        </div>
        <button className="w-full bg-lime-300 rounded-lg text-lime-950 text-base font-medium h-11 mt-auto">
          Cadastrar
        </button>
      </div>
    </div>
  );
}
