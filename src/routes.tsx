import { Routes as RoutesDOM, Route, BrowserRouter as Router, Navigate, Outlet } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Signup } from "./pages/signup/sign-up";
import { CreateTrip } from "./pages/logged-app/new-trip/create-trip";
import { TripDetailsPage } from "./pages/logged-app/trip/trip-details";
import { useOwner } from "./hooks/owner";

interface CustomRouteProps {
    isPrivate: boolean;
}

function CustomRoute({ isPrivate }: CustomRouteProps): React.ReactNode {
    const { authenticated } = useOwner();

    if (isPrivate && !authenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default function Routes() {
    return (
        <Router>
            <RoutesDOM>
                <Route path="/" element={<CustomRoute isPrivate={false} />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<CustomRoute isPrivate={false} />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/signup" element={<CustomRoute isPrivate={false} />}>
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route path="/create-trip" element={<CustomRoute isPrivate={true} />}>
                    <Route path="/create-trip" element={<CreateTrip />} />
                </Route>
                <Route path="/trips/:tripId" element={<CustomRoute isPrivate={true} />}>
                    <Route path="/trips/:tripId" element={<TripDetailsPage />} />
                </Route>
            </RoutesDOM>
        </Router>
    )
}