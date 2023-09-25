import { Avatar, Button, Input, Textarea, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import {
    AddressSelection,
    CustomCurrencyDisplay,
    CustomEditor,
    CustomSelectOption,
    UserDetailsItem,
} from '../partials';
import CustomAvatarUpload from '../partials/custom-avatar-upload';
import { useEffect, useState } from 'react';
import { userService } from '@/services';
import { useSelector } from 'react-redux';
import { CustomCartProductCard, CustomShippingInfoCard } from '../cards';
import CustomVoucherSubmit from '../partials/custom-voucher-submit';
import CustomShippingAddressCard from '../cards/custom-shipping-dddress-card';
import CustomSelectPaymentMethodCard from '../cards/custom-select-payment-method-card';

export function CustomOrderEditorForm({ data, isCreate, onChange }) {
    const [isLoading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const { role_id } = useSelector((state) => state.user.data);

    useEffect(() => {
        const handleGetRoles = async () => {
            setLoading(true);
            const response = await userService.getRolesService(role_id);
            if (response && response.code === 'SUCCESS') {
                setRoles(response.result);
            }
            setLoading(false);
        };
        handleGetRoles();
    }, []);

    /**EVENT HANDLER */
    const handleOnSelectRole = (value) => {
        const result = roles.find((item) => item.name === value);
        if (result && result.name !== data.role) {
            onChange('role', result.name);
            onChange('role_id', result.id);
        }
    };
    const handleOnChangeAddress = (key, value) => {
        switch (key) {
            case 'province':
                onChange('address', {
                    ...data.address,
                    province: value,
                    district: '',
                    ward: '',
                });
                break;
            case 'district':
                onChange('address', {
                    ...data.address,
                    district: value,
                    ward: '',
                });
                break;
            case 'ward':
                onChange('address', {
                    ...data.address,
                    ward: value,
                });
                break;
            default:
                onChange('address', {
                    ...data.address,
                    location: value,
                });
                break;
        }
    };
    const contents = [
        {
            key: 'name',
            type: 'text',
            label: 'Họ tên',
        },
        {
            key: 'phone_number',
            type: 'tel',
            label: 'Số điện thoại',
        },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-brown-50">
            <div className="mx-auto grid min-h-screen max-w-[1440px] gap-4 md:grid-cols-2">
                <div className="grid w-full gap-4 bg-white p-4">
                    <div className="grid gap-4 p-0">
                        <Typography className="text-xl font-semibold">Liên hệ</Typography>

                        {/* {!isLogged && (
                            <div className="flex items-end justify-end gap-1 p-0 leading-3">
                                <span className="text-xs">Bạn đã có tài khoản?</span>
                                <Link to={routes.login} className="block p-0">
                                    <span className="text-xs font-medium text-blue-500 underline">
                                        Đăng nhập
                                    </span>
                                </Link>
                            </div>
                        )} */}

                        <Input
                            size="lg"
                            color="blue"
                            label="Số diện thoại"
                            // value={customerPhoneNumber}
                            // readOnly={isLogged}
                            // onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                        />
                    </div>

                    <CustomShippingAddressCard
                    // data={shippingAddress}
                    // onChangeAddress={handleChangeShippingAddress}
                    />

                    <Textarea
                        color="blue"
                        resize={false}
                        label="Lưu ý cho người bán hàng"
                        // value={orderNote}
                        // onChange={(e) => setOrderNote(e.target.value)}
                    />

                    <CustomSelectPaymentMethodCard
                    // onChangePaymentMethod={handleChangePaymentMethod}
                    />
                </div>

                <div className="flex flex-col gap-4 p-4">
                    {/* <CustomPaymentDetailsCard data={paymentDetails} /> */}

                    <Button
                        size="lg"
                        variant="gradient"
                        className="flex items-center justify-center gap-2"
                        color="red"
                        // disabled={isLoading || !allowCheckout}
                        // onClick={handleCheckout}
                        fullWidth
                    >
                        {isLoading && <Spinner className="h-5 w-5" />}
                        Hoàn tất đơn hàng
                    </Button>

                    <Button
                        size="lg"
                        variant="outlined"
                        // onClick={() => navigate(routes.collections.replace(':slug', 'all'))}
                        fullWidth
                    >
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </div>
        </div>
    );
}

CustomOrderEditorForm.defaultProps = {};

CustomOrderEditorForm.propTypes = {
    data: PropTypes.object,
    isCreate: PropTypes.bool,
    onChange: PropTypes.func,
};

export default CustomOrderEditorForm;
