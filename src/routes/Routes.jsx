import Hero from "../components/hero/Hero";
import HomeLayout from "../layout/HomeLayout";
import UserLayout from "../layout/UserLayout";
import MoviePage from "../pages/MoviePage";
import ShowsPage from "../pages/ShowsPage";
import SignupPage from "../pages/SignupPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import UserRoutes from "../protectRoute/UserRoutes";
import AuthChecker from "../protectRoute/AuthChecker";
import ShowSeatPage from "../pages/ShowSeatPage";
import ViewBookingPage from "../pages/ViewBookingPage";
import LoginPage from '../pages/LoginPage';




export const routes = [
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Hero />
      },
      {
        path: "/movies",
        element: <MoviePage />,
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      }

    ]


  },
  {
    element: <UserRoutes> <UserLayout /></UserRoutes> ,
    children: [
      {
        path: "/home",
        element: <Hero />,
      },
      {
        path: "/userHome",
        element:<MoviePage />
      },
      {
        path: "/movie/:id",
        element: <MovieDetailPage />
      },
      {
        path: "/shows/:id",
        element:
          <ShowsPage />
       
      },
      {
        path: "/showSeat/:showId",
        element: <ShowSeatPage />
      },
      {
        path: "/bookings",
        element: <ViewBookingPage/>
      },
    ],
  },

];