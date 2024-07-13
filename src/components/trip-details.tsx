import { Calendar, MapPin, Settings2 } from "lucide-react";

export function TripDetailsPage() {
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div>
          <MapPin className="size-5 text-zinc-400" />
          <span className=" text-zinc-100">Florianópolis, Brasil</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className=" text-zinc-100">17 a 23 de agosto</span>
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          <button className="bg-zinc-800 text-lime-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
            Alterar local/data
            <Settings2 className="size-5" />
          </button>
        </div>
      </div>

        <main className="flex gap-16">
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">Atividades</h2>

                </div>
            </div>
            <div className="w-80 ">
                
            </div>
        </main>

    </div>
  );
}
