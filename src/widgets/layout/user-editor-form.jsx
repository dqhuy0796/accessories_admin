import { Avatar, Button, Input } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { AddressSelection, CustomEditor, CustomSelectOption, UserDetailsItem } from '../partials';
import CustomAvatarUpload from '../partials/custom-avatar-upload';

export function UserEditorForm({ data, onChange }) {
    const displayPosition = (id) => {
        switch (id) {
            case 0:
                return 'CEO / Co-Founder';
            case 1:
                return 'Manager';
            case 2:
                return 'Employee';
            default:
                return 'Unknown';
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
            layout: 'header',
            items: [
                {
                    key: 'name',
                    type: 'text',
                    label: 'Họ tên',
                },
                {
                    key: 'role_id',
                    type: 'select',
                    label: 'Loại tài khoản',
                    readonly: true,
                },
                {
                    key: 'birth',
                    type: 'date',
                    label: 'Ngày sinh',
                },
            ],
        },
        {
            layout: 'body',
            items: [
                {
                    key: 'phone_number',
                    type: 'tel',
                    label: 'Số điện thoại',
                    readonly: true,
                },
                {
                    key: 'email',
                    type: 'email',
                    label: 'Email',
                    readonly: true,
                },
                {
                    key: 'password',
                    type: 'password',
                    label: 'Mật khẩu',
                    readonly: true,
                },
            ],
        },
    ];

    return (
        <div className="grid w-full gap-6 lg:grid-cols-3">
            <div className="row-span-2 grid place-items-center">
                <CustomAvatarUpload
                    avatar={data?.avatar}
                    readOnly={false}
                    onChangeAvatar={(value) => onChange('avatar', value)}
                />
            </div>
            {contents.map(({ layout, items }, index) =>
                layout === 'header' ? (
                    <div key={index} className="grid gap-6 lg:col-span-2">
                        {items.map((item) =>
                            item.type === 'select' ? (
                                <CustomSelectOption
                                    key={item.key}
                                    variant={{ label: item.label }}
                                    value={displayPosition(data[item.key]) || ''}
                                    readonly={item.readonly ? true : false}
                                />
                            ) : (
                                <Input
                                    key={item.key}
                                    size="lg"
                                    color="blue"
                                    type={item.type}
                                    label={item.label}
                                    value={data[item.key] || ''}
                                    onChange={(e) => onChange(item.key, e.target.value)}
                                    readOnly={item.readonly ? true : false}
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <div key={index} className="grid gap-6 lg:col-span-2">
                        {items.map((item) => (
                            <div key={item.key} className="flex items-end justify-between gap-2">
                                {item.readonly ? (
                                    <>
                                        <UserDetailsItem
                                            label={item.label}
                                            text={data[item.key] || 'Unknown'}
                                            encrypt={item.key}
                                        />
                                        <Button
                                            size="sm"
                                            color="blue"
                                            variant="text"
                                            className="whitespace-nowrap px-2"
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </>
                                ) : (
                                    <Input
                                        key={item.key}
                                        size="lg"
                                        color="blue"
                                        type={item.type}
                                        label={item.label}
                                        value={
                                            item.type === 'password'
                                                ? 'password'
                                                : data[item.key] || ''
                                        }
                                        onChange={() => {}}
                                        readOnly={item.readonly ? true : false}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ),
            )}
            <div className="grid gap-6 lg:col-span-3">
                <AddressSelection address={data?.address} onChange={handleOnChangeAddress} />

                <CustomEditor value={data?.bio} onChange={(value) => onChange('bio', value)} />
            </div>
        </div>
    );
}

UserEditorForm.defaultProps = {};

UserEditorForm.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
};

export default UserEditorForm;
