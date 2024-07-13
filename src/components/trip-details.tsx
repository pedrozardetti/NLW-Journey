import { Calendar, MapPin } from "lucide-react";

export function TripDetailsPage() {
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div>
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-100">Florianópolis, Brasil</span>
        </div>

        <div>
            <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-100">17 a 23 de agosto
          </span>
          </div>

            <div className="w-px h-6 bg-zinc-800"/>

        </div>
      </div>
    </div>
  );
}
