import { dataService } from '@/services';
import { AddressSelection, CustomConfirmDialog, CustomSelectOption } from '@/widgets/partials';
import { CheckCircleIcon, ExclamationCircleIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Input, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserCreate() {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [dialog, setDialog] = useState({
        title: 'Tạo mới tài khoản',
        text: 'Xác nhận tạo mới tài khoản?',
    });
    const navigate = useNavigate();

    const handleGetRoles = async () => {
        setLoading(true);
        const response = await dataService.getRolesService();
        if (response && response.code === 'SUCCESS') {
            setRoles(response.result);
            setError(null);
        } else {
            setError('Error occurred while fetching roles.');
        }
        setLoading(false);
    };
    
    useEffect(() => {
        handleGetRoles();
    }, []);

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                handleGetRoles();
            }, 10000);
            return () => clearTimeout(timeout);
        }
    }, [error]);

    /** EVENT HANDLER */

    const handleOnChangeInput = (key, value) => {
        setUserData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleOnChangeAddress = (key, value) => {
        setUserData((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [key]: value,
            },
        }));
    };

    const handleOnSelectRole = (value) => {
        const result = roles.find((item) => item.name === value);
        if (result && result.name !== userData.role) {
            setUserData((prevState) => ({
                ...prevState,
                role: result.name,
                role_id: result.id,
            }));
        }
    };

    /** DATA SUBMIT HANDLER */

    const handleCreateUser = async (data) => {
        try {
            setDialog((prevState) => ({
                ...prevState,
                status: 'PENDING',
                text: 'Đang xử lý thông tin...',
            }));

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await dataService.createUserService(data);
                    resolve(result);
                }, 2000);
            });

            if (response && response.code === 'SUCCESS') {
                handleResetData();

                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Tạo mới tài khoản thành công!`,
                    icon: <CheckCircleIcon className="h-8 w-8 text-green-600" />,
                    btnCancel: 'Tạo thêm tài khoản',
                    btnConfirm: 'Đến trang quản lý',
                    onConfirm: handleRedirect,
                }));
            } else {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'FAILURE',
                    text: 'Tạo mới tài khoản không thành công!',
                    icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'FAILURE',
                text: error?.message || error || 'Tạo mới tài khoản không thành công!',
                icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateUser(userData);
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

    const handleRedirect = () => {
        navigate('/dashboard/user');
    };

    const handleResetData = () => {
        setUserData({});
    };

    const listInput = [
        {
            key: 'phone_number',
            type: 'tel',
            label: 'Số điện thoại',
            helper: '',
            required: true,
        },
        {
            key: 'email',
            type: 'email',
            label: 'Email',
            helper: '',
            required: true,
        },
        {
            key: 'password',
            type: 'password',
            label: 'Mật khẩu',
            helper: 'Mật khẩu phải có 8 ký tự, bao gồm CHỮ HOA, CHỮ THƯỜNG và CHỮ SỐ',
            required: true,
        },
        {
            key: 'confirm_password',
            type: 'password',
            label: 'Xác nhận mật khẩu',
            required: true,
        },
        {
            key: 'name',
            type: 'text',
            label: 'Họ tên',
            required: true,
        },
        {
            key: 'birth',
            type: 'date',
            label: 'Ngày sinh',
        },
    ];

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">Tạo tài khoản mới</Typography>

            <Card>
                <CardBody className='p-4'>
                    <div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <CustomSelectOption
                                options={roles}
                                variant={{
                                    key: 'role',
                                    label: 'Loại tài khoản',
                                }}
                                value={userData.role || ''}
                                loading={isLoading && _.isEmpty(roles)}
                                onSelect={handleOnSelectRole}
                            />
                        </div>
                        <div className="mt-6 grid gap-6 pt-6 sm:grid-cols-2">
                            {listInput.map((item, index) => (
                                <div key={item.key}>
                                    <Input
                                        size="lg"
                                        color="blue"
                                        type={item.type}
                                        label={item.label}
                                        required={item.required}
                                        value={userData[item.key] || ''}
                                        onChange={(e) => handleOnChangeInput(item.key, e.target.value)}
                                    />
                                    {item.helper && !_.isEmpty(item.helper) && (
                                        <Typography className="ml-2 mt-1 text-xs font-normal text-blue-gray-400">
                                            {item.helper}
                                        </Typography>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6">
                            <AddressSelection address={userData?.address || {}} onChange={handleOnChangeAddress} />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4 pt-6">
                        <Button
                            color="blue"
                            variant="gradient"
                            className="flex items-center gap-3 pl-4"
                            onClick={handleOpenDialog}
                        >
                            <PlusIcon className="h-5 w-5 text-white" />
                            Tạo tài khoản
                        </Button>
                        <Button
                            color="red"
                            variant="gradient"
                            className="flex items-center gap-3 pl-4"
                            onClick={() => navigate(-1)}
                        >
                            <XMarkIcon className="h-5 w-5 text-white" />
                            Hủy bỏ
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

export default UserCreate;
