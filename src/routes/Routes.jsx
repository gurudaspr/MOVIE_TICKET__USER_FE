import Hero from "../components/hero/Hero";
import HomeLayout from "../layout/HomeLayout";
import UserLayout from "../layout/UserLayout";
import MoviePage from "../pages/MoviePage";
import ShowsPage from "../pages/ShowsPage";
import Signinpage from "../pages/Signinpage";
import SignupPage from "../pages/SignupPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import ShowSeat from "../components/user/ShowSeat";
import UserRoutes from "../protectRoute/UserRoutes";
import Logout from "../protectRoute/Logout";
import AuthChecker from "../protectRoute/AuthChecker";



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
        element: <SignupPage />
      },
      {
        path: "/signin",
        element: <Signinpage />
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
        element: <ShowSeat />
      },
      {
        path:'/logout',
        element:<Logout/>
      }
    ],
  },

];