import { productService } from '@/services';
import { CustomConfirmDialog, CustomImageUpload, CustomSelectOption } from '@/widgets/partials';
import { CheckCircleIcon, ExclamationCircleIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, Input, Textarea, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProductCreate() {
    const [error, setError] = useState({ category: false, material: false });
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [productData, setProductData] = useState({});
    const [dialog, setDialog] = useState({
        title: 'Tạo mới sản phẩm',
        text: 'Xác nhận tạo mới sản phẩm?',
    });
    const navigate = useNavigate();

    const handleGetCategories = async () => {
        console.log('handleGetCategories');
        setLoading(true);
        const response = await productService.getCategoriesService();
        if (response && response.code === 'SUCCESS') {
            setCategories(response.result);
            setError((prevState) => ({
                ...prevState,
                category: false,
            }));
        } else {
            setError((prevState) => ({
                ...prevState,
                category: true,
            }));
        }
        setLoading(false);
    };

    const handleGetMaterials = async () => {
        setLoading(true);
        const response = await productService.getMaterialsService();
        if (response) {
            setMaterials(response.result);
            setError((prevState) => ({
                ...prevState,
                material: false,
            }));
        } else {
            setError((prevState) => ({
                ...prevState,
                material: true,
            }));
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetCategories();
        handleGetMaterials();
    }, []);

    const handleOnChangeInput = (key, value) => {
        setProductData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleOnSelectMaterial = (value) => {
        const result = materials.find((item) => item.name === value);
        if (result && result.name !== productData.material) {
            setProductData((prevState) => ({
                ...prevState,
                material: result.name,
                material_id: result.id,
            }));
        }
    };

    const handleOnSelectCategory = (value) => {
        const result = categories.find((item) => item.name === value);
        if (result && result.name !== productData.category) {
            setProductData((prevState) => ({
                ...prevState,
                category: result.name,
                category_id: result.id,
            }));
        }
    };

    const handleOnChangeImages = (values) => {
        setProductData((prevState) => ({
            ...prevState,
            images: values,
        }));
    };

    /** DATA SUBMIT HANDLER */

    const handleCreateProduct = async (data) => {
        try {
            setDialog((prevState) => ({
                ...prevState,
                status: 'PENDING',
                text: 'Đang xử lý thông tin...',
            }));

            const response = await new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await productService.createProductService(data);
                    resolve(result);
                }, 2000);
            });

            if (response && response.code === 'SUCCESS') {
                handleResetData();

                setDialog((prevState) => ({
                    ...prevState,
                    status: 'SUCCESS',
                    text: `Tạo mới sản phẩm thành công!`,
                    icon: <CheckCircleIcon className="h-8 w-8 text-green-600" />,
                    btnCancel: 'Tạo thêm sản phẩm',
                    btnConfirm: 'Đến trang quản lý',
                    onConfirm: handleRedirect,
                }));
            } else {
                setDialog((prevState) => ({
                    ...prevState,
                    status: 'FAILURE',
                    text: 'Tạo mới sản phẩm không thành công!',
                    btnConfirm: 'Thử lại',
                    icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
                }));
            }
        } catch (error) {
            setDialog((prevState) => ({
                ...prevState,
                status: 'FAILURE',
                btnConfirm: 'Thử lại',
                text: error?.message || error || 'Tạo mới sản phẩm không thành công!',
                icon: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateProduct(productData);
        console.log(productData);
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
        navigate('/dashboard/product');
    };

    const handleResetData = () => {
        setProductData({});
    };

    /** CONSTANTS */

    const listInput = [
        {
            key: 'name',
            type: 'text',
            label: 'Tên sản phẩm',
            required: true,
            span: 2,
        },
        {
            key: 'price',
            type: 'number',
            label: 'Giá sản phẩm (VND)',
            required: true,
        },
        {
            key: 'brand',
            type: 'text',
            label: 'Thương hiệu',
            required: true,
        },
        {
            key: 'category',
            type: 'select',
            label: 'Danh mục',
            options: categories,
            onSelect: handleOnSelectCategory,
            required: true,
        },
        {
            key: 'material',
            type: 'select',
            label: 'Chất liệu',
            options: materials,
            onSelect: handleOnSelectMaterial,
            required: true,
        },
        {
            key: 'color',
            type: 'text',
            label: 'Màu sắc',
            required: true,
        },
        {
            key: 'quantity',
            type: 'number',
            label: 'Số lượng',
            required: true,
        },
    ];

    return (
        <div className="my-10 flex flex-col gap-12">
            <Typography variant="h4">Thêm sảm phẩm mới</Typography>

            <Card>
                <CardBody className="p-4">
                    <div className="mb-4 grid gap-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {listInput.map((item) =>
                                item.type === 'select' ? (
                                    <div key={item.key} className={item.span ? `sm:col-span-2` : null}>
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
                                    </div>
                                ) : (
                                    <div key={item.key} className={item.span ? `sm:col-span-2` : null}>
                                        <Input
                                            color="blue"
                                            size="lg"
                                            type={item.type}
                                            label={item.label}
                                            value={productData[item.key] || ''}
                                            required={item?.required || false}
                                            onChange={(e) => handleOnChangeInput(item.key, e.target.value)}
                                        />
                                    </div>
                                ),
                            )}
                        </div>

                        <Textarea
                            color="blue"
                            resize={true}
                            label="Mô tả sản phẩm"
                            value={productData.description || ''}
                            required={true}
                            onChange={(e) => handleOnChangeInput('description', e.target.value)}
                        />

                        <CustomImageUpload images={productData?.images} onChange={handleOnChangeImages} />
                    </div>

                    <div className="flex w-full flex-wrap items-center gap-4 md:w-fit md:flex-nowrap">
                        <Button
                            color="blue"
                            variant="gradient"
                            className="flex w-full items-center justify-center gap-3 pl-4 md:w-fit"
                            type="submit"
                            onClick={handleOpenDialog}
                        >
                            <PlusIcon className="h-4 w-4" />
                            <span className="relative top-px text-ellipsis whitespace-nowrap">Tạo sản phẩm mới</span>
                        </Button>
                        <Button
                            color="red"
                            variant="gradient"
                            className="flex w-full items-center justify-center gap-3 pl-4 md:w-fit"
                        >
                            <XMarkIcon className="h-4 w-4" />
                            <span className="relative top-px text-ellipsis whitespace-nowrap">Hủy bỏ</span>
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <CustomConfirmDialog {...dialog} />
        </div>
    );
}

export default ProductCreate;
