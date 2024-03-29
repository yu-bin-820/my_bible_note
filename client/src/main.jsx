import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Redirection from "./pages/Redirection/Redirection.jsx";
import Home from "./pages/Home/Home.jsx";
import AddNote from "./pages/AddNote/AddNote.jsx";
import MyNotes from "./pages/MyNotes/MyNotes.jsx";
import Note from "./pages/Note/Note.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/kakao',
                element: <Redirection />
            },
            {
                path: '/addnote',
                element: <AddNote />

            },
            {
                path: '/mynote',
                element: <MyNotes />

            },
            {
                path: '/updatenote/:noteno',
                element: <Note />

            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
