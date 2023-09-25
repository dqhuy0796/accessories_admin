import { orderService, userService } from '@/services';
import {
    CustomConfirmDialog,
    CustomCrudMenu,
    CustomCurrencyDisplay,
    CustomPagination,
} from '@/widgets/partials';
import CustomBagdeNotification from '@/widgets/partials/cutom-bagde-notification';
import {
    ArrowsUpDownIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/react/24/solid';
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Collapse,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Radio,
    Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomOrderTable from './order-table';

export function Orders() {
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [openSorter, setOpenSorter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [filterMenu, setFilterMenu] = useState([]);
    const [filteredRole, setFilteredRole] = useState('all');
    const [dialog, setDialog] = useState({
        title: 'Xóa đơn hàng',
        text: 'Xác nhận xóa đơn hàng?',
    });
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.data);

    const handleGetOrders = async (status_id, page) => {
        setLoading(true);
        const response = await orderService.getOrdersService(status_id, page);

        if (response && response.code === 'SUCCESS') {
            const { page, total_pages, total_results, result } = response;
            setOrders(result);
            setCurrentPage(Number(page));
            setTotalPages(Number(total_pages));
            setTotalResults(Number(total_results));
            console.log(response);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetOrders();
    }, []);

    const handleGetProductsCount = async () => {
        setLoading(true);
        const response = await userService.getUsersCountService(currentUser.role_id);
        if (response && response.code === 'SUCCESS') {
            setFilterMenu(response.result);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetProductsCount();

        const title = document.title;

        document.title = 'Quản lý đơn hàng';

        return () => (document.title = title);
    }, []);

    // useEffect(() => {
    //     handleGetUsers(currentUser?.role_id, filteredRole, currentPage);
    // }, [filteredRole, currentPage]);

    /** DATA SUBMIT HANDLER */

    const handleDeleteUser = async (data) => {
        try {
            setDialog((prevState) => ({
                ...prevState,
                status: 'PENDING',
                text: 'Đang xử lý thông tin...',
            }));

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await userService.deleteUserService(data);
                    resolve(result);
                }, 2000);
            });

            if (response && response.code === 'SUCCESS') {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Đã xóa đơn hàng "${data.phone_number}".`,
                    icon: <CheckCircleIcon className="h-8 w-8 text-green-600" />,
                    onConfirm: handleCloseDialog,
                }));
                handleGetUsers();
            } else {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'FAILURE',
                    text: 'Xóa đơn hàng không thành công!',
                    icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'FAILURE',
                text: error?.message || error || 'Xóa đơn hàng không thành công!',
                icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
            }));
        }
    };

    const handleOpenDialog = (data) => {
        setDialog((prevState) => ({
            ...prevState,
            open: true,
            btnCancel: 'Hủy',
            btnConfirm: 'Xác nhận',
            handler: handleCloseDialog,
            onCancel: handleCloseDialog,
            onConfirm: () => handleDeleteUser(data),
        }));
    };

    const handleCloseDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    const handleRedirectToCreate = () => {
        navigate(`/dashboard/order/create`);
    };

    const handleRedirectToPreview = (username) => {
        navigate(`/dashboard/order/detail/${username}`);
    };

    const handleRedirectToUpdate = (username) => {
        navigate(`/dashboard/order/update/${username}`);
    };

    const handleToggleFilter = () => {
        setOpenFilter((prevOpen) => !prevOpen);
    };

    const handleToggleSorter = () => {
        setOpenSorter((prevOpen) => !prevOpen);
    };

    const handleOnChangePagination = (value) => {
        setCurrentPage(value);
    };

    /** FILTER */

    // onPreview={() => handleRedirectToPreview(item.phone_number)}
    // onUpdate={() => handleRedirectToUpdate(item.phone_number)}
    // onDelete={() => handleOpenDialog(item)}

    /**SORTER */

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">Danh sách đơn hàng</Typography>
            <Card>
                <CardHeader
                    color="transparent"
                    shadow={false}
                    floated={false}
                    className="m-0 p-4 pb-0"
                >
                    <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
                        <div className="lg:col-span-2">
                            <Input
                                size="md"
                                label="Tìm kiếm"
                                color="blue-gray"
                                icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-3 sm:flex-nowrap md:col-span-2 lg:col-span-3">
                            <Button
                                size="md"
                                color="blue"
                                variant="gradient"
                                className="flex w-full items-center justify-center gap-1 pl-4 sm:w-max"
                                onClick={handleRedirectToCreate}
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span>Đơn hàng mới</span>
                            </Button>

                            <Button
                                size="md"
                                color="blue-gray"
                                variant="outlined"
                                className="flex w-[calc(50%-6px)] items-center justify-center gap-1 pl-4 sm:w-max"
                                onClick={handleToggleFilter}
                            >
                                <FunnelIcon className="h-4 w-4" />
                                Bộ lọc
                            </Button>

                            <Button
                                size="md"
                                color="blue-gray"
                                variant="outlined"
                                className="flex w-[calc(50%-6px)] items-center justify-center gap-1 pl-4 sm:w-max"
                                onClick={handleToggleSorter}
                            >
                                <ArrowsUpDownIcon className="h-4 w-4" />
                                Sắp xếp
                            </Button>
                        </div>
                    </div>

                    <Collapse open={openFilter}>
                        <div className="mt-4 rounded-lg border border-blue-gray-100 p-4">
                            <Typography className="ml-2 mb-2 text-sm font-semibold">
                                Phân quyền
                            </Typography>
                            <div className="grid grid-cols-2 gap-x-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                <Radio
                                    color="blue"
                                    name="role"
                                    value="all"
                                    label={
                                        <span className="text-xs font-medium">
                                            {`Tất cả (${filterMenu.reduce((sum, user) => {
                                                return sum + Number(user.user_count);
                                            }, 0)})`}
                                        </span>
                                    }
                                    checked={filteredRole === 'all'}
                                    onChange={() => setFilteredRole('all')}
                                />
                                {filterMenu &&
                                    filterMenu.length > 0 &&
                                    filterMenu.map((item) => (
                                        <Radio
                                            color="blue"
                                            name="role"
                                            key={item.id}
                                            value={item.slug}
                                            label={
                                                <span className="text-xs font-medium line-clamp-1">
                                                    {`${item.name} (${item.user_count})`}
                                                </span>
                                            }
                                            checked={filteredRole === item.slug}
                                            onChange={() => setFilteredRole(item.slug)}
                                        />
                                    ))}
                            </div>
                        </div>
                    </Collapse>

                    <Collapse open={openSorter}>
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            <Menu>
                                <MenuHandler>
                                    <Button
                                        size="sm"
                                        color="blue-gray"
                                        variant="outlined"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <ArrowsUpDownIcon className="h-4 w-4" />
                                        <span>tên</span>
                                    </Button>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>a-z A-Z</MenuItem>
                                    <MenuItem>z-a Z-A</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </Collapse>
                </CardHeader>
                <CardBody className="p-4">
                    <div className="overflow-x-auto">
                        <CustomOrderTable data={orders} />
                    </div>
                </CardBody>
                <CardFooter className="pt-0 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
                        <Typography color="gray" className="flex gap-1 text-sm">
                            <strong className="font-semibold text-gray-900">
                                {currentPage * 12 - 11}
                            </strong>
                            <span>-</span>
                            <strong className="font-semibold text-gray-900">
                                {currentPage * 12 < totalResults ? currentPage * 12 : totalResults}
                            </strong>
                            <span>of</span>
                            <strong className="font-semibold text-gray-900">
                                {totalResults * 1}
                            </strong>
                        </Typography>

                        <CustomPagination
                            current={currentPage}
                            total={totalPages}
                            onPagination={handleOnChangePagination}
                        />
                    </div>
                </CardFooter>
            </Card>

            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

export default Orders;
