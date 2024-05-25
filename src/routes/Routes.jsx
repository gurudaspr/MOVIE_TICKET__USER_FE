import Hero from "../components/hero/Hero";
import HomeLayout from "../layout/HomeLayout";
import UserLayout from "../layout/UserLayout";
import MoviePage from "../pages/MoviePage";
import ShowsPage from "../pages/ShowsPage";
import Signinpage from "../pages/Signinpage";
import SignupPage from "../pages/SignupPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import ShowSeat from "../components/user/ShowSeat";



 export  const routes = [
    {
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Hero />,
        },
        {
          path: "/movies",
          element: <MoviePage/>,
        },
        {
          path: "/signup",
          element : <SignupPage/>
        },
        {
          path: "/signin",
          element : <Signinpage/>
        }
        
      ]

  
    },
    {
      element: <UserLayout />,
      children: [
        {
          path: "/home",
          element: <Hero />,
        },
        {
          path: "/userHome",
          element: <MoviePage/>,
        },
        {
          path: "/movie/:id",
          element: <MovieDetailPage/>
        },
        {
          path: "/shows/:id",
          element: <ShowsPage/>
        },
        {
          path: "/showSeat/:showId",
          element: <ShowSeat/>
        }
      ],
    },
  
];