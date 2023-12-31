import { userService } from '@/services';
import { CustomOrderEditorForm, CustomUserEditorForm } from '@/widgets/forms';
import { CustomConfirmDialog, CustomCrudGroupButtons } from '@/widgets/partials';
import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function OrderEditor() {
    const [isLoading, setLoading] = useState(false);
    const [updatable, setUpdatable] = useState(false);
    const [orderData, setUserData] = useState({ address: {} });
    const [defaultData, setDefaultData] = useState({ address: {} });
    const [dialog, setDialog] = useState({
        title: 'Cập nhật thông tin đơn hàng',
        text: 'Xác nhận cập nhật thông tin đơn hàng?',
    });
    const navigate = useNavigate();
    const { orderuuid } = useParams();

    useEffect(() => {
        const handleGetUserByUsername = async (orderuuid) => {
            setLoading(true);
            const response = await userService.getUserByUsernameService(orderuuid);
            if (response && response.code === 'SUCCESS') {
                const birth = handleFormatDate(response.result.birth);
                const address = handleConvertAddress(response.result.address);
                setDefaultData({
                    ...response.result,
                    birth,
                    address,
                });
                setUserData({
                    ...response.result,
                    birth,
                    address,
                });
            }
            setLoading(false);
        };

        if (orderuuid) {
            handleGetUserByUsername(orderuuid);
        }
    }, [orderuuid]);

    useEffect(() => {
        if (_.isEqual(orderData, defaultData)) {
            setUpdatable(false);
        } else {
            setUpdatable(true);
        }

        return () => setUpdatable(false);
    }, [orderData]);

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

    const handleCloseDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    const handleRedirectToManagerPage = () => {
        navigate('/dashboard/user');
    };

    const handleCancel = async () => {
        navigate(-1);
    };

    const handleResetData = () => {
        setUserData({ address: {} });
    };

    /** 1: Create User */
    const handleOpenCreateDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: true,
            status: 'READY',
            title: 'Tạo mới đơn hàng',
            text: 'Xác nhận tạo mới đơn hàng?',
            handler: handleCloseDialog,
            btnCancel: 'Hủy',
            onCancel: handleCloseDialog,
            btnConfirm: 'Tạo mới',
            onConfirm: handleSubmitCreateUser,
        }));
    };
    const handleSubmitCreateUser = (e) => {
        e.preventDefault();
        handleCreateUser(orderData);
    };
    const handleCreateUser = async (data) => {
        try {
            setDialog((prevState) => ({
                ...prevState,
                status: 'PENDING',
                text: 'Đang xử lý thông tin...',
            }));

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await userService.createUserService(data);
                    resolve(result);
                }, 1000);
            });

            if (response && response.code === 'SUCCESS') {
                handleResetData();

                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Tạo mới đơn hàng thành công!`,
                    btnCancel: 'Tạo thêm đơn hàng',
                    btnConfirm: 'Đến trang quản lý',
                    onConfirm: handleRedirectToManagerPage,
                }));
            } else {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'ERROR',
                    text: 'Tạo mới đơn hàng không thành công!',
                    btnConfirm: 'Thử lại',
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'ERROR',
                btnConfirm: 'Thử lại',
                text: error?.message || error || 'Tạo mới đơn hàng không thành công!',
            }));
        }
    };

    /** 2: Update User */
    const handleOpenUpdateDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: true,
            status: 'READY',
            title: 'Cập nhật đơn hàng',
            text: 'Xác nhận cập nhật đơn hàng?',
            handler: handleCloseDialog,
            btnCancel: 'Hủy',
            onCancel: handleCloseDialog,
            btnConfirm: 'Cập nhật',
            onConfirm: handleSubmitUpdateUser,
        }));
    };
    const handleSubmitUpdateUser = (e) => {
        e.preventDefault();
        handleUpdateUser(orderData);
    };
    const handleUpdateUser = async (data) => {
        try {
            setDialog((prevState) => ({
                ...prevState,
                status: 'PENDING',
                text: 'Đang xử lý thông tin...',
            }));

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await userService.updateUserService(data);
                    resolve(result);
                }, 1000);
            });

            if (response && response.code === 'SUCCESS') {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Cập nhật thông tin thành công!`,
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
                    status: 'ERROR',
                    btnConfirm: 'Thử lại',
                    text: 'Cập nhật thông tin không thành công!',
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'ERROR',
                btnConfirm: 'Thử lại',
                text: error?.message || error || 'Cập nhật thông tin không thành công!',
            }));
        }
    };

    /** 3: Delete User */
    const handleOpenDeleteDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: true,
            status: 'WARNING',
            title: 'Xóa đơn hàng',
            text: 'Xác nhận xóa đơn hàng này?',
            handler: handleCloseDialog,
            btnCancel: 'Hủy',
            onCancel: handleCloseDialog,
            btnDelete: 'Xoá',
            onDelete: handleSubmitDeleteUser,
        }));
    };
    const handleSubmitDeleteUser = (e) => {
        e.preventDefault();
        handleDeleteUser(orderData);
    };
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
                }, 1000);
            });

            if (response && response.code === 'SUCCESS') {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Đã xóa "${data.name}".`,
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
                        handleRedirectToManagerPage();
                    }
                }, 100);
            } else {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'ERROR',
                    btnDelete: 'Thử lại',
                    text: 'Xóa đơn hàng không thành công!',
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'ERROR',
                btnDelete: 'Thử lại',
                text: error?.message || error || 'Xóa đơn hàng không thành công!',
            }));
        }
    };

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">
                {orderuuid ? 'Cập nhật thông tin đơn hàng' : 'Tạo đơn hàng mới'}
            </Typography>
            <Card>
                <CardBody className="p-4">
                    {/* {!_.isEmpty(orderData) && (
                        <CustomOrderEditorForm
                            data={orderData}
                            isCreate={!orderuuid}
                            onChange={handleOnChangeInput}
                        />
                    )} */}
                </CardBody>

                <CardFooter className="p-4">
                    {orderuuid ? (
                        <CustomCrudGroupButtons
                            btnConfirn={{
                                text: 'Cập nhật',
                                disabled: !updatable,
                                onClick: handleOpenUpdateDialog,
                            }}
                            btnDelete={{
                                text: 'Xóa',
                                onClick: handleOpenDeleteDialog,
                            }}
                            btnCancel={{
                                text: 'Hủy',
                                onClick: handleCancel,
                            }}
                        />
                    ) : (
                        <CustomCrudGroupButtons
                            btnConfirn={{
                                text: 'Tạo mới',
                                disabled: !updatable,
                                onClick: handleOpenCreateDialog,
                            }}
                            btnCancel={{
                                text: 'Hủy',
                                onClick: handleCancel,
                            }}
                        />
                    )}
                </CardFooter>
            </Card>
            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

// OrderEditor.propTypes = {
//     data: PropTypes.object,
// };

export default OrderEditor;
