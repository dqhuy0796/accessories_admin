import { dataService } from '@/services';
import { CustomConfirmDialog, UserDetailsItem } from '@/widgets/partials';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function UserDetails() {
    const [isLoading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [dialog, setDialog] = useState({
        title: 'Xóa tài khoản',
        text: 'Xác nhận xóa tài khoản?',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleGetUserById = async (id) => {
            setLoading(true);
            let response = await dataService.getUserByIdService(id);
            if (response && response.code === 'SUCCESS') {
                response.result.birth = handleFormatDate(response.result.birth);
                setUserData(response.result);
            }
            setLoading(false);
        };

        handleGetUserById(id);
    }, []);

    const handleFormatDate = (date) => {
        const localeDate = new Date(date);
        const day = localeDate.getDate().toString().padStart(2, '0');
        const month = (localeDate.getMonth() + 1).toString().padStart(2, '0');
        const year = localeDate.getFullYear();
        return `${year}-${month}-${day}`;
    };

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
                }));

                let countdown = 50;
                const countdownInterval = setInterval(() => {
                    setDialog((prevState) => ({
                        ...prevState,
                        countdown: countdown / 10,
                    }));
                    countdown = countdown - 1;
                    if (countdown === 0) {
                        clearInterval(countdownInterval);
                        navigate(-1);
                    }
                }, 100);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDeleteUser(userData);
    };

    const handleOpenDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: true,
            btnCancel: 'Hủy',
            btnConfirm: 'Xác nhận',
            handler: handleCloseDialog,
            onCancel: handleCloseDialog,
            onConfirm: handleSubmit,
        }));
    };

    const handleCloseDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    const contents = [
        {
            layout: 'header',
            items: [
                {
                    key: 'role',
                    label: 'Loại tài khoản',
                },
                {
                    key: 'name',
                    label: 'Họ tên',
                },
                {
                    key: 'birth',
                    label: 'Ngày sinh',
                },
            ],
        },
        {
            layout: 'body',
            items: [
                {
                    key: 'phone_number',
                    label: 'Số điện thoại',
                },
                {
                    key: 'email',
                    label: 'Email',
                },
                {
                    key: 'password',
                    label: 'Mật khẩu',
                },
            ],
        },
        {
            layout: 'footer',
            items: [
                {
                    key: 'address',
                    label: 'Địa chỉ',
                },
            ],
        },
    ];

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">Thông tin tài khoản</Typography>

            <Card>
                <CardBody className='p-4'>
                    <div>
                        {contents.map((section) => {
                            if (section.layout === 'header') {
                                return (
                                    <div key={section.layout} className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                                        {section.items.map((item) => (
                                            <UserDetailsItem
                                                key={item.key}
                                                label={item.label}
                                                loading={isLoading}
                                                text={userData[item.key] || 'Unknown'}
                                            />
                                        ))}
                                    </div>
                                );
                            } else if (section.layout === 'body') {
                                return (
                                    <div key={section.layout} className="mt-6 grid gap-6 pt-6">
                                        {section.items.map((item) => (
                                            <div key={item.key} className="flex items-start justify-between gap-4">
                                                <UserDetailsItem
                                                    key={item.key}
                                                    label={item.label}
                                                    loading={isLoading}
                                                    text={userData[item.key] || 'Unknown'}
                                                />
                                                <Typography
                                                    color="blue"
                                                    className="shrink-0 cursor-pointer text-xs font-medium hover:underline"
                                                >
                                                    Chỉnh sửa
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={section.layout} className="mt-6 pt-6">
                                        {section.items.map((item) => (
                                            <UserDetailsItem
                                                key={item.key}
                                                label={item.label}
                                                loading={isLoading}
                                                text={userData[item.key] || 'Unknown'}
                                            />
                                        ))}
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 md:flex-nowrap">
                        <div className="flex w-full flex-wrap items-center gap-4 md:w-fit md:flex-nowrap">
                            <Link to={`/dashboard/user/update/${userData.id}`} className="w-full md:w-fit">
                                <Button
                                    color="blue"
                                    variant="gradient"
                                    disabled={isLoading}
                                    className="flex w-full items-center justify-center gap-3 pl-4 md:w-fit"
                                >
                                    <PencilSquareIcon className="h-4 w-4" />
                                    <span className="relative top-px text-ellipsis whitespace-nowrap">Chỉnh sửa</span>
                                </Button>
                            </Link>
                            <Button
                                color="red"
                                variant="gradient"
                                disabled={isLoading}
                                className="flex w-full items-center justify-center gap-3 pl-4 md:w-fit"
                                onClick={handleOpenDialog}
                            >
                                <TrashIcon className="h-4 w-4" />
                                <span className="relative top-px text-ellipsis whitespace-nowrap">Xóa</span>
                            </Button>
                        </div>
                        <Button
                            color="white"
                            variant="gradient"
                            onClick={() => navigate(-1)}
                            className="w-full md:w-fit"
                        >
                            <span className="relative top-px text-ellipsis whitespace-nowrap">Trở về</span>
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

export default UserDetails;
