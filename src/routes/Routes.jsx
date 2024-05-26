import Hero from "../components/hero/Hero";
import HomeLayout from "../layout/HomeLayout";
import UserLayout from "../layout/UserLayout";
import MoviePage from "../pages/MoviePage";
import ShowsPage from "../pages/ShowsPage";
import Signinpage from "../pages/Signinpage";
import SignupPage from "../pages/SignupPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import ShowSeat from "../components/user/ShowSeat";
import EasyMethod from "../protectRoute/EasyMethod";
import UserRoutes from "../protectRoute/UserRoutes";
import Logout from "../protectRoute/Logout";



export const routes = [
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Hero />,
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
    element: <EasyMethod><UserLayout /></EasyMethod>,
    children: [
      {
        path: "/home",
        element: <Hero />,
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
        element: <UserRoutes>
          <ShowsPage />
        </UserRoutes>
      },
      {
        path: "/showSeat/:showId",
        element: <UserRoutes><ShowSeat /></UserRoutes>
      },
      {
        path:'/logout',
        element:<Logout/>
      }
    ],
  },

];