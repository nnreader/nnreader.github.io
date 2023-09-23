import React, { Suspense } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

const Book = React.lazy(() => import("./pages/Book"));
const Index = React.lazy(() => import("./pages/index"));

const router = createHashRouter([
  {
    path: "/book",
    element: (
      <Suspense>
        <Book></Book>
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense>
        <Index></Index>
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
