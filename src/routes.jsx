import {
    Home,
    ProductCreate,
    ProductDetails,
    Products,
    Tables,
    UserCreate,
    UserDetails,
    UserUpdate,
    Users
} from '@/pages/dashboard';
import {
    ArchiveBoxIcon,
    HomeIcon,
    TableCellsIcon,
    UserCircleIcon,
    UserIcon
} from '@heroicons/react/24/solid';
import Login from './pages/auth/Login';
import ProfileUpdate from './pages/dashboard/profile/update-profile';
import Profile from './pages/dashboard/profile/profile';

const icon = {
    className: 'w-5 h-5 text-inherit',
};

export const routes = [
    {
        layout: 'dashboard',
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                name: 'bảng điều khiển',
                path: '/home',
                element: <Home />,
            },
            {
                icon: <UserCircleIcon {...icon} />,
                name: 'trang cá nhân',
                path: '/profile',
                element: <Profile />,
                routes: [
                    {
                        path: '/profile',
                        element: <Profile />,
                    },
                    {
                        path: '/profile/update',
                        element: <ProfileUpdate />,
                    },
                ],
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: 'tables',
                path: '/tables',
                element: <Tables />,
            },
            {
                icon: <UserIcon {...icon} />,
                name: 'Tài khoản',
                path: '/user',
                element: <Users />,
                routes: [
                    {
                        path: '/user',
                        element: <Users />,
                    },
                    {
                        path: '/user/create',
                        element: <UserCreate />,
                    },
                    {
                        path: '/user/detail/:username',
                        element: <UserDetails />,
                    },
                    {
                        path: '/user/update/:username',
                        element: <UserUpdate />,
                    },
                ],
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: 'khách hàng',
                path: '/customers',
                element: <Tables />,
            },
            {
                icon: <ArchiveBoxIcon {...icon} />,
                name: 'sản phẩm',
                path: '/product',
                element: <Products />,
                routes: [
                    {
                        path: '/product',
                        element: <Products />,
                    },
                    {
                        path: '/product/create',
                        element: <ProductCreate />,
                    },
                    {
                        path: '/product/detail/:id',
                        element: <ProductDetails />,
                    },
                    {
                        path: '/product/update/:id',
                        element: <ProductCreate />,
                    },
                ],
            },
        ],
    },
    {
        layout: 'auth',
        pages: [
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
];

export default routes;
