import { SignIn, SignUp } from '@/pages/auth';
import {
    Home,
    Notifications,
    ProductCreate,
    ProductDetails,
    Products,
    Profile,
    Tables,
    Users,
    UserCreate,
    UserDetails,
    UserUpdate,
} from '@/pages/dashboard';
import {
    ArchiveBoxIcon,
    ArrowRightOnRectangleIcon,
    BellIcon,
    HomeIcon,
    TableCellsIcon,
    UserCircleIcon,
    UserIcon,
    UserPlusIcon,
} from '@heroicons/react/24/solid';
import ProductUpdate from './pages/dashboard/product/product-update';

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
            },
            {
                hideInMenu: true,
                icon: <TableCellsIcon {...icon} />,
                path: '/user/create',
                element: <UserCreate />,
            },
            {
                hideInMenu: true,
                icon: <TableCellsIcon {...icon} />,
                path: '/user/detail/:id',
                element: <UserDetails />,
            },
            {
                hideInMenu: true,
                icon: <TableCellsIcon {...icon} />,
                path: '/user/update/:id',
                element: <UserUpdate />,
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
            },
            {
                hideInMenu: true,
                icon: <TableCellsIcon {...icon} />,
                path: '/product/create',
                element: <ProductCreate />,
            },
            {
                hideInMenu: true,
                icon: <TableCellsIcon {...icon} />,
                path: '/product/detail/:id',
                element: <ProductDetails />,
            },
            {
                hideInMenu: true,
                icon: <TableCellsIcon {...icon} />,
                path: '/product/update/:id',
                element: <ProductUpdate />,
            },
            {
                icon: <BellIcon {...icon} />,
                name: 'notifactions',
                path: '/notifactions',
                element: <Notifications />,
            },
        ],
    },
    {
        title: 'auth pages',
        layout: 'auth',
        pages: [
            {
                icon: <ArrowRightOnRectangleIcon {...icon} />,
                name: 'sign in',
                path: '/login',
                element: <SignIn />,
            },
            {
                icon: <UserPlusIcon {...icon} />,
                name: 'sign up',
                path: '/register',
                element: <SignUp />,
            },
        ],
    },
];

export default routes;
