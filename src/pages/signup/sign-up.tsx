import { Lock, Mail, UserRoundPlus, Eye } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useOwner } from "../../hooks/owner";
import { CreateOwnerRequest } from "../../types/Owner";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export function Signup() {
  const { createOwner } = useOwner();

  const navigate = useNavigate();

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const [emailFocus, setEmailFocus] = useState(false);

  const [senhaFocus, setSenhaFocus] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(true);

  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleCreateOwner = useCallback(async (owner: CreateOwnerRequest) => {
    try {

      await createOwner(owner);

      await toast.success("Cadastro feito com sucesso.")
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }, [createOwner, navigate])

  useEffect(() => {
    const validateEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/;

    if (emailFocus) {
      setIsEmailValid(validateEmail.test(email));
    }
  }, [emailFocus, email]);

  useEffect(() => {
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

    if (senhaFocus) {
      setIsPasswordValid(validatePassword.test(senha));
    }
  }, [senhaFocus, senha]);

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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div
            className={classNames(
              "flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border items-center",
              {
                "border-zinc-700": isEmailValid,
                "border-red-500": !isEmailValid,
              }
            )}
          >
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
          <div
            className={classNames(
              "flex gap-2 bg-zinc-950 w-full rounded-lg h-16 border items-center",
              {
                "border-zinc-700": isPasswordValid,
                "border-red-500": !isPasswordValid,
              }
            )}
          >
            <Lock className="size-5 text-zinc-400 ml-4" />
            <input
              className="bg-transparent outline-none w-4/5"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onFocus={() => setSenhaFocus(true)}
              onBlur={() => setSenhaFocus(false)}
            />
            <Eye className="size-5 text-zinc-400" onClick={toggleShowPassword} />
          </div>
        </div>
        <button onClick={() => {
          handleCreateOwner({ name: nome, email: email, password: senha })
        }} className="w-full bg-lime-300 rounded-lg text-lime-950 text-base font-medium h-11 mt-auto">
          Cadastrar
        </button>
        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
}
