import { Lock, Mail } from "lucide-react";
import { useCallback, useState } from "react";
import { useOwner } from "../../hooks/owner";
import { AuthOwnerRequest } from "../../types/Owner";
import { toast, Toaster } from "sonner";

export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useOwner();

  const handleSignIn = async ({ email, password }: AuthOwnerRequest) => {
    try {
      await signIn({ email, password })

      toast.success("Login feito com sucesso.")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[477px] w-full max-h-[549px] h-full bg-zinc-800 rounded-lg  flex flex-col pt-6 px-4 pb-14">
        <img src="/logo.svg" alt="plann.er" className="self-center w-44" />
        <span className="mt-10 mb-4 font-bold ml-2">Entre na sua conta!</span>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border border-zinc-700 items-center">
            <Mail className="size-5 text-zinc-400 ml-4" />
            <input
              className="bg-transparent outline-none w-full"
              type="e-mail"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />



          </div>
          <div className="flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border border-zinc-700 items-center">
            <Lock className="size-5 text-zinc-400 ml-4" />
            <input
              className="bg-transparent outline-none w-full"
              type="text"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button onClick={() => handleSignIn({ email, password })} className="w-full bg-lime-300 rounded-lg text-lime-950 text-base font-medium h-11 mt-auto">
          Login
        </button>
      </div>
      <Toaster className="border-lime-600" position="top-right" duration={6000} toastOptions={{

        classNames: {
          toast: 'bg-zinc-800',
          title: 'text-zinc-100',
          actionButton: 'text-lime-300',
          closeButton: 'text-zinc-100',
          icon: 'text-lime-300',
          cancelButton: 'text-zinc-100',

        }
      }} />
    </div>
  );
}
