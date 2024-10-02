import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppPage } from "../pages/app-page";
import ErrorPage from "../error-page";
import { CreatePage } from "../pages/create-page";
import { DetailNewsPage } from "../pages/detail-page";
import { UpdatePage } from "../pages/update-page";
import { useEffect } from "react";
import { useNewsStore } from "../store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
  {
    path: "/news/:id",
    element: <DetailNewsPage />,
  },
  {
    path: "/update/:id",
    element: <UpdatePage />,
  },
]);

export const Init = () => {
  const setNews = useNewsStore((state) => state.setNews);
  const isInit = useNewsStore((state) => state.isInit);
  const setIsInit = useNewsStore((state) => state.setIsInit);
  useEffect(() => {
    console.log("INIT");
    const savedNews = localStorage.getItem("news");
    if (savedNews) {
      setNews(JSON.parse(savedNews));
      setIsInit(true);
    }
  }, [setNews, setIsInit]);

  return isInit ? <RouterProvider router={router} /> : null;
};
