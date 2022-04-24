import { Routes, Route, Navigate } from "react-router-dom";
import {Layout } from 'antd'


import Register from "./registation/Register";
import Login from "./registation/Login";
import Overview from "./Overview";
import Video from "./Video";

import data from '../data.json'
import { useAuth } from "../context/auth-context";


export const AppRouter = () => {
    const { user } = useAuth();

    return (
        <Routes>
            {user && (
                <>
                    <Route path="/" element={<Overview />} />
                    <Route  path="video/:id"  element={<Video videos={data.videos} />} ></Route>
                </>
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} replace />
        </Routes>
    )
}