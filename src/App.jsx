import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
  SinglePageError,
} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as aboutLoader } from "./pages/About";
import { loader as cocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/Newsletter";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,

      children: [
        {
          index: true,
          loader: landingLoader(queryClient),
          errorElement: <SinglePageError />,
          element: <Landing />,
        },
        {
          path: "about",
          loader: aboutLoader,
          element: <About />,
        },
        {
          path: "cocktail/:id",
          errorElement: <SinglePageError />,
          loader: cocktailLoader(queryClient),
          element: <Cocktail />,
        },
        { path: "error", element: <Error /> },
        {
          path: "newsletter",
          element: <Newsletter />,
          action: newsletterAction,
        },
      ],
    },
  ]);
  // const router = useRoutes([
  //   {
  //     path: "/",
  //     element: <HomeLayout />,

  //     children: [
  //       { index: true, element: <Landing /> },
  //       {
  //         path: "about",
  //         element: <About />,
  //       },
  //       { path: "cocktail", element: <Cocktail /> },
  //       { path: "error", element: <Error /> },
  //       { path: "newsletter", element: <Newsletter /> },
  //     ],
  //     path: "*",
  //     element: <Error />,
  //   },
  // ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
