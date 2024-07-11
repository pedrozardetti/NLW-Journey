export function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem
          </p>
          <p className="text-zinc-300 text-lg">
            Antes, faça <span className="text-lime-300">login</span> ou{" "}
            <span className="text-lime-300">cadastre-se!</span>
          </p>

          <p className="text-sm text-zinc-500 mt-16">
            Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
            <br />
            com nossos{" "}
            <a className="text-zinc-300 underline" href="#">
              termos de uso{" "}
            </a>{" "}
            e{" "}
            <a className="text-zinc-300 underline" href="#">
              políticas de privacidade.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
