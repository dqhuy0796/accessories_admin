import { dataService } from '@/services';
import { AddressSelection, CustomConfirmDialog, CustomSelectOption, UserDetailsItem } from '@/widgets/partials';
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Input, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function UserUpdate() {
    const [roles, setRoles] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [updatable, setUpdatable] = useState(false);
    const [userData, setUserData] = useState({ address: {} });
    const [defaultData, setDefaultData] = useState({ address: {} });
    const [dialog, setDialog] = useState({
        title: 'Cập nhật thông tin tài khoản',
        text: 'Xác nhận cập nhật thông tin tài khoản?',
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const handleGetRoles = async () => {
            setLoading(true);

            const response = await dataService.getRolesService();

            if (response) {
                setRoles(response.result);
            }

            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };

        const handleGetUserById = async (id) => {
            setLoading(true);
            let response = await dataService.getUserByIdService(id);
            if (response && response.code === 'SUCCESS') {
                response.result.birth = handleFormatDate(response.result.birth);
                response.result.address = handleConvertAddress(response.result.address);
                setDefaultData(response.result);
                setUserData(response.result);
            }
            setLoading(false);
        };

        handleGetUserById(id);

        handleGetRoles();
    }, []);

    const handleFormatDate = (date) => {
        const localeDate = new Date(date);
        const day = localeDate.getDate().toString().padStart(2, '0');
        const month = (localeDate.getMonth() + 1).toString().padStart(2, '0');
        const year = localeDate.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleConvertAddress = (address) => {
        const slicedAddress = address.split('-').filter((item) => item !== '');

        const province = slicedAddress.pop();
        const district = slicedAddress.pop();
        const ward = slicedAddress.pop();
        const location = slicedAddress.join('-');
        return { location, ward, district, province };
    };

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

    useEffect(() => {
        if (_.isEqual(userData, defaultData)) {
            setUpdatable(false);
        } else {
            setUpdatable(true);
        }

        return () => setUpdatable(false);
    }, [userData]);

    /** DATA SERVICE */

    const handleUpdateUser = async (data) => {
        try {
            setDialog((prevState) => ({
                ...prevState,
                status: 'PENDING',
                text: 'Đang xử lý thông tin...',
            }));

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await dataService.updateUserService(data);
                    resolve(result);
                }, 2000);
            });

            if (response) {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Cập nhật thông tin thành công!`,
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
                    text: 'Cập nhật thông tin không thành công!',
                    icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'FAILURE',
                text: error?.message || error || 'Cập nhật thông tin không thành công!',
                icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateUser(userData);
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
            layout: 'updatable',
            items: [
                {
                    key: 'name',
                    type: 'text',
                    label: 'Họ tên',
                },
                {
                    key: 'birth',
                    type: 'date',
                    label: 'Ngày sinh',
                },
            ],
        },
        {
            layout: 'readonly',
            items: [
                {
                    key: 'phone_number',
                    type: 'tel',
                    label: 'Số điện thoại',
                },
                {
                    key: 'email',
                    type: 'email',
                    label: 'Email',
                },
                {
                    key: 'password',
                    type: 'password',
                    label: 'Mật khẩu',
                },
            ],
        },
    ];

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">Cập nhật thông tin tài khoản</Typography>
            <Card>
                <CardBody className='p-4'>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                        <CustomSelectOption
                            options={roles}
                            variant={{ label: 'Loại tài khoản' }}
                            value={userData.role}
                            loading={isLoading && _.isEmpty(roles)}
                            onSelect={handleOnSelectRole}
                        />
                    </div>

                    {contents.map(({ layout, items }) =>
                        layout === 'readonly' ? (
                            <div key={layout} className="mt-12 grid gap-6">
                                {items.map((item) => (
                                    <div key={item.key} className="flex items-start justify-between gap-4">
                                        <UserDetailsItem
                                            key={item.key}
                                            label={item.label}
                                            loading={isLoading && _.isEmpty(userData)}
                                            text={userData[item.key] || 'Unknown'}
                                        />
                                        <Typography color="blue" className="shrink-0 text-sm font-semibold">
                                            Chỉnh sửa
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div key={layout} className="mt-12 grid gap-6 sm:grid-cols-2">
                                {items.map((item) => (
                                    <Input
                                        {...item}
                                        color="blue"
                                        value={userData[item.key] || ''}
                                        onChange={(e) => handleOnChangeInput(item.key, e.target.value)}
                                    />
                                ))}
                            </div>
                        ),
                    )}

                    <div className="mt-12">
                        <AddressSelection address={userData.address} onChange={handleOnChangeAddress} />
                    </div>

                    <div className="mt-12 flex items-center gap-4">
                        <Button
                            color="blue"
                            variant="gradient"
                            disabled={!updatable}
                            className="flex items-center gap-3 pl-4"
                            onClick={handleOpenDialog}
                        >
                            <ArrowPathIcon className="h-5 w-5 text-white" />
                            Cập nhật
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
                <CustomConfirmDialog {...dialog} />
            </Card>
        </div>
    );
}

// UserUpdate.propTypes = {
//     data: PropTypes.object,
// };

export default UserUpdate;
