import { productService } from '@/services';
import { CustomEditor, CustomSelectOption } from '@/widgets/partials';
import { Input } from '@material-tailwind/react';
import _ from 'lodash';
import { memo, useEffect, useState } from 'react';

function CustomProductEditorForm({ data, onChange }) {
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const handleGetCategories = async () => {
            setLoading(true);
            const response = await productService.getCategoriesService();
            if (response && response.code === 'SUCCESS') {
                setCategories(response.result);
            }
            setLoading(false);
        };

        const handleGetMaterials = async () => {
            setLoading(true);
            const response = await productService.getMaterialsService();
            if (response) {
                setMaterials(response.result);
            }
            setLoading(false);
        };

        handleGetCategories();

        handleGetMaterials();
    }, []);

    return (
        <form action='#' className="grid gap-4">
            <div className="grid gap-4 md:col-span-2">
                <Input
                    size="lg"
                    color="blue"
                    label="Tên sản phẩm"
                    required
                    value={data.name || ''}
                    onChange={(e) => onChange('name', e.target.value)}
                />
                <Input
                    size="lg"
                    color="blue"
                    label="Slug"
                    required
                    value={data.slug || ''}
                    onChange={(e) => onChange('slug', e.target.value)}
                />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-2 md:grid-cols-3">
                <Input
                    size="lg"
                    color="blue"
                    label="Giá bán"
                    type="number"
                    required
                    value={data.price || ''}
                    onChange={(e) => onChange('price', e.target.value)}
                />
                <Input
                    size="lg"
                    color="blue"
                    label="Thương hiệu"
                    required
                    value={data.brand || ''}
                    onChange={(e) => onChange('brand', e.target.value)}
                />
                <CustomSelectOption
                    options={categories}
                    variant={{
                        label: 'Danh mục',
                        required: true,
                    }}
                    value={data.category || ''}
                    loading={isLoading && _.isEmpty(categories)}
                    onSelect={(value) => onChange('category', value)}
                />
                <CustomSelectOption
                    options={materials}
                    variant={{
                        label: 'Chất liệu',
                        required: true,
                    }}
                    value={data.material || ''}
                    loading={isLoading && _.isEmpty(materials)}
                    onSelect={(value) => onChange('material', value)}
                />
                <Input
                    size="lg"
                    color="blue"
                    label="Màu sắc"
                    required
                    value={data.color || ''}
                    onChange={(e) => onChange('color', e.target.value)}
                />
                <Input
                    size="lg"
                    color="blue"
                    label="Số lượng"
                    type="number"
                    required
                    value={data.quantity || ''}
                    onChange={(e) => onChange('quantity', e.target.value)}
                />
            </div>
            <div className="grid md:col-span-2">
                <CustomEditor value={data.description} onChange={(value) => onChange('description', value)} />
            </div>
        </form>
    );
}

export default memo(CustomProductEditorForm);
