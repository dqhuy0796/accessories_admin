import { dataService, productService } from '@/services';
import { CustomConfirmDialog, CustomCurrencyDisplay, UserDetailsItem } from '@/widgets/partials';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Carousel, Rating, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function ProductDetails() {
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

    const handleRedirectToUpdate = (id) => {
        navigate(`/dashboard/product/update/${id}`);
    };

    const contents = [
        {
            layout: 'header',
            items: [
                {
                    key: 'name',
                    label: 'Tên sản phẩm',
                },
                {
                    key: 'price',
                    label: 'Giá bán',
                    type: 'currency',
                },
            ],
        },
        {
            layout: 'body',
            items: [
                {
                    key: 'brand',
                    label: 'Thương hiệu',
                },
                {
                    key: 'category',
                    label: 'Danh mục',
                },
                {
                    key: 'material',
                    label: 'Chất liệu',
                },
                {
                    key: 'color',
                    label: 'Màu sắc',
                },
                {
                    key: 'quantity',
                    label: 'Tổng số',
                },
                {
                    key: 'sold',
                    label: 'Đã bán',
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
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="row-span-2">
                            {productData.images && productData.images.length > 0 ? (
                                <Carousel
                                    className="rounded-md"
                                    navigation={({ setActiveIndex, activeIndex, length }) => (
                                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                            {new Array(length).fill('').map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                                        activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                                                    }`}
                                                    onClick={() => setActiveIndex(i)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {productData?.images.map((image) => (
                                        <img
                                            key={image.id}
                                            src={image.secure_url}
                                            alt={image.public_id}
                                            className="h-full w-full object-cover"
                                        />
                                    ))}
                                </Carousel>
                            ) : (
                                <div className="h-full w-full animate-pulse rounded-md bg-blue-gray-200 pt-[100%]"></div>
                            )}
                        </div>

                        {contents.map(({ layout, items }) =>
                            layout === 'header' ? (
                                <div key={layout} className="grid lg:col-span-2">
                                    {items.map((item) =>
                                        item.type === 'currency' ? (
                                            <CustomCurrencyDisplay
                                                key={item.key}
                                                value={productData[item.key]}
                                                className="text-lg font-medium text-red-600"
                                            />
                                        ) : (
                                            <Typography key={item.key} className="text-2xl font-semibold">
                                                {productData[item.key] || ''}
                                            </Typography>
                                        ),
                                    )}
                                </div>
                            ) : layout === 'body' ? (
                                <div
                                    key={layout}
                                    className="mt-auto grid grid-cols-2 gap-4 pt-4 lg:col-span-2 lg:grid-cols-3"
                                >
                                    {items.map((item) => (
                                        <ProductDetailsItem
                                            key={item.key}
                                            label={item.label}
                                            content={productData[item.key]}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div key={layout} className="border-t border-gray-200 pt-3 md:col-span-2 lg:col-span-3">
                                    {items.map((item) =>
                                        item.key === 'description' ? (
                                            <div
                                                key={item.key}
                                                dangerouslySetInnerHTML={{ __html: productData[item.key] }}
                                            />
                                        ) : (
                                            <Typography key={item.key} className="text-sm">
                                                {productData[item.key] || ''}
                                            </Typography>
                                        ),
                                    )}
                                </div>
                            ),
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 md:flex-nowrap">
                        <div className="flex w-full flex-wrap items-center gap-4 md:w-fit md:flex-nowrap">
                            <Button
                                color="blue"
                                variant="gradient"
                                disabled={isLoading}
                                className="flex w-full items-center justify-center gap-3 pl-4 md:w-fit"
                                onClick={() => handleRedirectToUpdate(productData.id)}
                            >
                                <PencilSquareIcon className="h-4 w-4" />
                                <span className="relative top-px text-ellipsis whitespace-nowrap">Chỉnh sửa</span>
                            </Button>

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
                            color="blue-gray"
                            variant="outlined"
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

export default ProductDetails;

const ProductDetailsItem = ({ label = 'label', content = 'content', loading }) => (
    <div className="container rounded-lg bg-gray-200 p-3">
        {loading ? (
            <>
                <Typography className="mb-3 animate-pulse bg-blue-gray-600 text-xs text-transparent">1</Typography>
                <Typography className="animate-pulse  bg-blue-gray-300 text-sm text-transparent">2</Typography>
            </>
        ) : (
            <>
                <Typography className="mb-3 text-xs font-semibold">{label}</Typography>
                <Typography className="text-sm font-normal capitalize text-blue-gray-500">{content}</Typography>
            </>
        )}
    </div>
);
