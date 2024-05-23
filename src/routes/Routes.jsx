import Hero from "../components/hero/Hero";
import HomeLayout from "../layout/HomeLayout";
import MoviePage from "../pages/MoviePage";
import Signinpage from "../pages/Signinpage";
import SignupPage from "../pages/SignupPage";



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
  
];