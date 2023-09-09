import { dataService, productService } from '@/services';
import {
    CustomConfirmDialog,
    CustomCurrencyDisplay,
    CustomEditor,
    CustomImageUpload,
    CustomSelectOption,
    UserDetailsItem,
} from '@/widgets/partials';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Carousel, Input, Rating, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function ProductUpdate() {
    const [isLoading, setLoading] = useState(false);
    const [productData, setProductData] = useState({});
    const [dialog, setDialog] = useState({
        title: 'Xóa tài khoản',
        text: 'Xác nhận xóa tài khoản?',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleGetProductById = async (id) => {
            setLoading(true);
            const response = await productService.getProductByIdService(id);
            if (response && response.code === 'SUCCESS') {
                setProductData(response.result);
                console.log(response);
            }
            setLoading(false);
        };
        handleGetProductById(id);
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
        handleDeleteUser(productData);
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
                    key: 'name',
                    label: 'Tên sản phẩm',
                    type: 'text',
                },
                {
                    key: 'price',
                    label: 'Giá bán',
                    type: 'number',
                },
            ],
        },
        {
            layout: 'body',
            items: [
                {
                    key: 'brand',
                    label: 'Thương hiệu',
                    type: 'text',
                },
                {
                    key: 'category',
                    label: 'Danh mục',
                    option: [],
                    type: 'select',
                },
                {
                    key: 'material',
                    label: 'Chất liệu',
                    option: [],
                    type: 'select',
                },

                {
                    key: 'color',
                    label: 'Màu sắc',
                    type: 'text',
                },
                {
                    key: 'quantity',
                    label: 'Tổng số',
                    type: 'number',
                },
                {
                    key: 'sold',
                    label: 'Đã bán',
                    type: 'number',
                },
            ],
        },
        {
            layout: 'footer',
            items: [
                {
                    key: 'description',
                    label: 'Mô tả sản phẩm',
                },
            ],
        },
    ];

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">Thông tin tài khoản</Typography>

            <Card>
                <CardBody className="p-4">
                    <div className="grid gap-4">
                        {contents.map(({ layout, items }) =>
                            layout === 'header' ? (
                                <div className="grid gap-4 md:col-span-2">
                                    {items.map((item) => (
                                        <Input
                                            size="lg"
                                            color="blue"
                                            label={item.label}
                                            value={productData[item.key] || ''}
                                        />
                                    ))}
                                </div>
                            ) : layout === 'body' ? (
                                <div className="grid gap-4 md:col-span-2 sm:grid-cols-2 md:grid-cols-3">
                                    {items.map((item) =>
                                        item.type === 'select' ? (
                                            <CustomSelectOption
                                                options={item.options}
                                                variant={{
                                                    key: item.key,
                                                    label: item.label,
                                                    required: item?.required || false,
                                                }}
                                                value={productData[item.key] || ''}
                                                loading={isLoading && _.isEmpty(item.options)}
                                                onSelect={item.onSelect}
                                            />
                                        ) : (
                                            <Input
                                                size="lg"
                                                color="blue"
                                                type={item.type}
                                                label={item.label}
                                                value={
                                                    productData[item.key]
                                                        ? productData[item.key]
                                                        : item.type === 'number'
                                                        ? 0
                                                        : ''
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="grid md:col-span-2">
                                    {items.map((item) => (
                                        <CustomEditor
                                            key={item.key}
                                            value={productData[item.key] || ''}
                                            onChange={() => {}}
                                        />
                                    ))}
                                    <CustomImageUpload images={productData.images} onChange={() => {}} />
                                </div>
                            ),
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 md:flex-nowrap">
                        <div className="flex w-full flex-wrap items-center gap-4 md:w-fit md:flex-nowrap">
                            <Link to={`/dashboard/user/update/${productData.id}`} className="w-full md:w-fit">
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

export default ProductUpdate;

const ProductDetailsItem = ({ label, content, loading }) => (
    <div className="container rounded-lg bg-gray-200 p-3">
        {loading ? (
            <>
                <Typography className="mb-3 animate-pulse bg-blue-gray-600 text-xs text-transparent">
                    {label}
                </Typography>
                <Typography className="animate-pulse  bg-blue-gray-300 text-sm text-transparent">{content}</Typography>
            </>
        ) : (
            <>
                <Typography className="mb-3 text-xs font-semibold">{label}</Typography>
                <Typography className="text-sm font-normal capitalize text-blue-gray-500">{content}</Typography>
            </>
        )}
    </div>
);
