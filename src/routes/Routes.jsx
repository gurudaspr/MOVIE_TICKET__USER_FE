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
import ErrorPage from "../pages/Errorpage";




export const routes = [
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <AuthChecker><Hero /></AuthChecker>
      },
      {
        path: "/movies",
        element: <MoviePage />,
      },
      {
        path: "/signup",
        element:<AuthChecker><SignupPage /></AuthChecker> 
      },
      {
        path: "/login",
        element: <AuthChecker><LoginPage /></AuthChecker>
      },
      {
        path: "*",
        element: <ErrorPage />
      }

    ]
  },
  {
    element:  <UserLayout />,
    children: [
      {
        path: "/home",
        element: <UserRoutes><Hero /></UserRoutes>
      },
      {
        path: "/userHome",
        element:<UserRoutes><MoviePage /></UserRoutes>
      },
      {
        path: "/movie/:id",
        element: <UserRoutes><MovieDetailPage /></UserRoutes>
      },
      {
        path: "/shows/:id",
        element: <UserRoutes><ShowsPage /> </UserRoutes>
       
      },
      {
        path: "/showSeat/:showId",
        element: <UserRoutes><ShowSeatPage /></UserRoutes>
      },
      {
        path: "/bookings",
        element: <UserRoutes><ViewBookingPage/></UserRoutes>
      },
     
    ],
  },

];