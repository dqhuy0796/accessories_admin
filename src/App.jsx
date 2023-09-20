import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Auth } from '@/layouts';
import { useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { useEffect, useState } from 'react';
import { logout, refreshTokens } from './redux/actions/userAction';
import { userService } from './services';

function App() {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.user.isLogged);
    const refreshToken = useSelector((state) => state.user.refreshToken);

    useEffect(() => {
        const handleRefreshTokens = async () => {
            try {
                if (refreshToken) {
                    dispatch(refreshTokens());
                    console.log('refresh tokens', new Date());
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.log(error);
                dispatch(logout());
            }
        };

        handleRefreshTokens();
    }, []);

    return (
        <Routes>
            <Route path="/auth/*" element={<Auth />} />
            {isLogged ? (
                <>
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
                </>
            ) : (
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            )}
        </Routes>
    );
}

export default App;
