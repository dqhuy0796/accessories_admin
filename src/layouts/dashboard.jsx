import { useMaterialTailwindController } from '@/context';
import routes from '@/routes';
import { Configurator, DashboardNavbar, Footer, Sidenav } from '@/widgets/layout';
import { Breadcrumbs, Typography } from '@material-tailwind/react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

export function Dashboard() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { pathname } = useLocation();
    const paths = pathname.split('/').filter((el) => el !== '');

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav routes={routes} brandImg={'/img/logo-ct.png'} />
            <DashboardNavbar />
            <div className="p-4 xl:ml-80">
                <Configurator />
                <div className="capitalize">
                    <Breadcrumbs className="mt-2 py-3 bg-transparent p-0 transition-all">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {paths[0]}
                        </Typography>
                        {paths.length > 2 && paths.slice(1, -1).map((path, index) => (
                            <Link key={index} to={`/${paths.slice(0, index + 2).join('/')}`}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal transition-all hover:text-blue-500 hover:underline"
                                >
                                    {path}
                                </Typography>
                            </Link>
                        ))}
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {paths[paths.length - 1]}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Routes>
                    {routes.map(
                        ({ layout, pages }) =>
                            layout === 'dashboard' &&
                            pages.map(({ path, element }) => <Route exact path={path} element={element} />),
                    )}
                </Routes>
            </div>
        </div>
    );
}

Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;
