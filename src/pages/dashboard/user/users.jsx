import { dataService } from '@/services';
import { CustomConfirmDialog, CustomCrudMenu, CustomTableMenu } from '@/widgets/partials';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Users() {
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [dialog, setDialog] = useState({
        title: 'Xóa tài khoản',
        text: 'Xác nhận xóa tài khoản?',
    });
    const navigate = useNavigate();

    const handleGetUsers = async () => {
        setLoading(true);
        const response = await dataService.getUsersService();

        if (response && response.code === 'SUCCESS') {
            setUsers(response.result);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetUsers();
    }, []);

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
                    const result = await dataService.deleteUserService(data);
                    resolve(result);
                }, 2000);
            });

            if (response && response.code === 'SUCCESS') {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Đã xóa tài khoản "${data.phone_number}".`,
                    icon: <CheckCircleIcon className="h-8 w-8 text-green-600" />,
                    onConfirm: handleCloseDialog,
                }));
                handleGetUsers();
            } else {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'FAILURE',
                    text: 'Xóa tài khoản không thành công!',
                    icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'FAILURE',
                text: error?.message || error || 'Xóa tài khoản không thành công!',
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
        navigate(`/dashboard/user/create`);
    };
    const handleRedirectToPreview = (id) => {
        navigate(`/dashboard/user/detail/${id}`);
    };
    const handleRedirectToUpdate = (id) => {
        navigate(`/dashboard/user/update/${id}`);
    };

    const dataTable = [
        {
            title: 'số điện thoại',
            key: 'phone_number',
            className: 'text-left',
        },
        {
            title: 'email',
            key: 'email',
        },
        {
            title: 'họ tên',
            key: 'name',
        },
        {
            title: 'địa chỉ',
            key: 'address',
        },
        {
            title: 'loại tài khoản',
            key: 'role',
        },
    ];

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">Danh sách tài khoản</Typography>
            <Card>
                <CardBody className="p-4">
                    <CustomTableMenu onCreate={handleRedirectToCreate} />
                    <div className="overflow-x-auto">
                        <table className="mt-4 w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {dataTable.map((item) => (
                                        <th
                                            key={item.key}
                                            className="text-ellipsis whitespace-nowrap border-t border-blue-gray-100 first:text-left"
                                        >
                                            <Typography className="py-3 px-5 text-xs font-bold uppercase text-blue-gray-400">
                                                {item.title}
                                            </Typography>
                                        </th>
                                    ))}
                                    <th className="border-t border-blue-gray-100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.map((item, index) => {
                                        const className = 'text-ellipsis py-3 px-5 border-t border-blue-gray-100';
                                        return (
                                            <tr key={index}>
                                                {dataTable.map((col) => (
                                                    <td key={col.key} className={className}>
                                                        <Typography className="whitespace-nowrap italic text-blue-gray-600 ">
                                                            {item[col.key]}
                                                        </Typography>
                                                    </td>
                                                ))}
                                                {/* <td className={className}>
                                                    <Typography className="whitespace-nowrap italic text-blue-gray-600 ">
                                                        {item.email}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="whitespace-nowrap font-medium text-blue-gray-600 ">
                                                        {item.name}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography className="min-w-[320px] italic text-blue-gray-600 line-clamp-1">
                                                        {item.address}
                                                    </Typography>
                                                </td>
                                                <td className={className + ' text-center'}>
                                                    <Chip
                                                        variant="gradient"
                                                        color={
                                                            item.role_id === 0
                                                                ? 'deep-orange'
                                                                : item.role_id === 1
                                                                ? 'deep-purple'
                                                                : item.role_id === 2
                                                                ? 'blue'
                                                                : 'blue-gray'
                                                        }
                                                        value={item.role}
                                                        className="py-px text-xs"
                                                    />
                                                </td> */}
                                                <td className="border-t border-blue-gray-100 py-3 pl-5 text-right">
                                                    <CustomCrudMenu
                                                        onPreview={() => handleRedirectToPreview(item.id)}
                                                        onUpdate={() => handleRedirectToUpdate(item.id)}
                                                        onDelete={() => handleOpenDialog(item)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-ellipsis whitespace-nowrap border-t border-blue-gray-100 py-3 px-5"
                                        >
                                            Không có dữ liệu người dùng nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

export default Users;
