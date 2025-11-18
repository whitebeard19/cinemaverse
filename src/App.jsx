import React from 'react';
import ReactDOM from "react-dom/client";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import About from './pages/About';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Discover from './pages/Discover';
import ActorDetails from './pages/ActorDetails';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
    return (
        <>
        <Provider store={store}>
         <Navbar />
         <Outlet />
        </Provider>
        </>
       
    );
};

const appRouter = createBrowserRouter([
    {
       path: "/",
       element: <App />,
       children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path:"/favorites",
            element: <Favorites />,
        },
        {
            path:"/discover",
            element: <Discover />
        },
        {
            path: "/movie/:movieid",
            element: <MovieDetails />,
        },
        {
            path: "/actor/:actorid",
            element: <ActorDetails />,
        },
       ], 
    },
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);