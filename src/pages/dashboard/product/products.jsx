import { productService } from '@/services';
import { CustomProductCard } from '@/widgets/cards';
import { CustomConfirmDialog } from '@/widgets/partials';
import CustomFilterMenu from '@/widgets/partials/custom-filter-menu';
import { CheckCircleIcon, ExclamationCircleIcon, FunnelIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Input, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isOpenFilterMenu, setOpenFilterMenu] = useState(false);
    const [dialog, setDialog] = useState({
        title: 'Xóa sản phẩm',
        text: 'Xác nhận xóa sản phẩm?',
    });
    const navigate = useNavigate();

    const handleGetProducts = async () => {
        setLoading(true);
        const response = await productService.getProductsService();
        if (response && response.code === 'SUCCESS') {
            setProducts(response.result);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetProducts();
    }, []);

    const handleToggleFilterMenu = () => {
        setOpenFilterMenu((prevIsOpen) => !prevIsOpen);
    };

    const handleRedirectToCreate = () => {
        navigate(`/dashboard/product/create`);
    };
    const handleRedirectToPreview = (id) => {
        navigate(`/dashboard/product/detail/${id}`);
    };
    const handleRedirectToUpdate = (id) => {
        navigate(`/dashboard/product/update/${id}`);
    };

    /** DATA SUBMIT HANDLER */

    const handleDeleteProduct = async (data) => {
        try {
            setDialog((prevState) => ({
                ...prevState,
                status: 'PENDING',
                text: 'Đang xử lý thông tin...',
            }));

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await productService.deleteProductService(data);
                    resolve(result);
                }, 2000);
            });

            if (response && response.code === 'SUCCESS') {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Đã xóa sản phẩm "${data.phone_number}".`,
                    icon: <CheckCircleIcon className="h-8 w-8 text-green-600" />,
                    onConfirm: handleCloseDialog,
                }));
                handleGetUsers();
            } else {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'FAILURE',
                    text: 'Xóa sản phẩm không thành công!',
                    onConfirm: handleCloseDialog,
                    icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'FAILURE',
                text: error?.message || error || 'Xóa sản phẩm không thành công!',
                onConfirm: handleCloseDialog,
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
            onConfirm: () => handleDeleteProduct(data),
        }));
    };

    const handleCloseDialog = () => {
        setDialog((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">Danh sách sản phẩm</Typography>
            <Card>
                <CardBody className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="relative flex w-full max-w-[24rem]">
                            <Input type="search" label="Tìm kiếm" className="" />
                        </div>

                        <div className="relative flex w-full items-center justify-between gap-3 md:w-max">
                            <Button
                                size="sm"
                                color="blue"
                                variant="gradient"
                                className="flex items-center gap-1 pl-4"
                                onClick={handleRedirectToCreate}
                            >
                                <PlusIcon className="h-5 w-5 text-white" />
                                <span>Sản phẩm mới</span>
                            </Button>

                            <div className="relative">
                                <Button
                                    size="sm"
                                    color="blue-gray"
                                    variant="outlined"
                                    className="flex items-center gap-1 pl-4 outline-none"
                                    onClick={handleToggleFilterMenu}
                                >
                                    <FunnelIcon className="h-5 w-5 text-blue-gray-500" />
                                    Bộ lọc
                                </Button>

                                <CustomFilterMenu open={isOpenFilterMenu} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-3">
                        {isLoading ? (
                            [1, 2, 3, 4, 5, 6].map((element) => <CustomProductCard key={element} />)
                        ) : products && products.length > 0 ? (
                            products.map((item, index) => (
                                <CustomProductCard
                                    key={index}
                                    data={item}
                                    onPreview={() => handleRedirectToPreview(item.id)}
                                    onUpdate={() => handleRedirectToUpdate(item.id)}
                                    onDelete={() => handleOpenDialog(item)}
                                />
                            ))
                        ) : (
                            <Typography className="text-ellipsis whitespace-nowrap py-3 px-5">
                                Không có dữ liệu sản phẩm nào
                            </Typography>
                        )}
                    </div>
                </CardBody>
            </Card>

            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

export default Products;
