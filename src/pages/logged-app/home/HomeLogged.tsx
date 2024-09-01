import { useCallback, useEffect } from "react";
import { useTrip } from "../../../hooks/useTrip";
import { Trip } from "../../../types/Trip";
import { Calendar, ArrowRight } from "lucide-react";

export default function HomeLogged() {

    const { TripList, getTrips } = useTrip();

    const handleGetTrips = useCallback(async () => {
        await getTrips(0, 5);
    }, [getTrips]);

    useEffect(() => {
        handleGetTrips();
    }, [handleGetTrips]);

    function formatDateRange(startDate: string, endDate: string): string {
        const getMonthName = (monthNumber: number): string => {
            const months = [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            return months[monthNumber];
        };

        const start = new Date(startDate);
        const end = new Date(endDate);

        const startDay = start.getDate();
        const startMonth = start.getMonth();
        const endDay = end.getDate();
        const endMonth = end.getMonth();

        return `${startDay} a ${endDay} de ${getMonthName(startMonth)}`;
    }

    return (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-left w-[780px] mt-[200px] text-2xl mb-14 font-bold">Suas viagens</h1>
          {TripList?.trips.map((trip: Trip) => (
            <div key={trip.destination} className="flex justify-between items-center w-[780px] h-20 gap-x-10 bg-zinc-900 rounded-xl indent-3">
              <span className="font-bold text-xl">{trip.destination}</span>
              <div className="flex items-center ml-auto gap-x-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span>{formatDateRange(trip.starts_at, trip.ends_at)}</span>
                    </div>
              <button className="bg-lime-300 text-lime-950 w-32 h-9 rounded-md font-semibold flex items-center justify-center mr-4">
                        <span className="mr-2">Entrar</span>
                        <ArrowRight className="w-5 h-5 text-lime-950" />
                    </button>
            </div>
          ))}
        </div>
    );
}
