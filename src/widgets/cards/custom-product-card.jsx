import { Chip, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { CustomCrudMenu, CustomCurrencyDisplay } from '../partials';

export function CustomProductCard({ data, onPreview, onUpdate, onDelete }) {
    return data ? (
        <div className="relative flex flex-wrap items-center gap-3 rounded-lg border border-blue-gray-100 p-3 shadow-lg md:flex-nowrap">
            <div className="min-w-[100px] w-1/3 shrink-0 md:w-[calc(100%/8)]">
                <div className="relative w-full pt-[100%]">
                    <div className="absolute inset-0 overflow-hidden rounded">
                        <img src={data.image_url} alt={data.name} className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="relative grid w-full grid-cols-4 gap-3 text-blue-gray-500 md:grid-cols-5">
                <div className="col-span-3 md:col-span-4">
                    <Typography className="text-lg font-medium line-clamp-1">{data.name}</Typography>
                    <Typography className="text-sm">{data.category}</Typography>
                </div>

                <div className="col-span-2">
                    <Typography className="mb-1 text-xs">Giá bán</Typography>
                    <CustomCurrencyDisplay className="text-sm font-medium text-red-500" value={data.price} />
                </div>

                <div className="">
                    <Typography className="mb-1 text-xs">Tổng số</Typography>
                    <Typography className="text-sm font-medium">{data.quantity}</Typography>
                </div>

                <div className="">
                    <Typography className="mb-1 text-xs">Đã bán</Typography>
                    <Typography className="text-sm font-medium">{data.sold}</Typography>
                </div>

                <div className="hidden lg:block">
                    <Typography className="mb-1 text-xs">Trạng thái</Typography>
                    <Chip
                        variant="gradient"
                        color={'green'}
                        value={'In stock'}
                        className="mr-auto w-max pt-1 pb-0.5 text-[10px]"
                    />
                </div>
            </div>

            <div className="absolute top-1 right-1">
                <CustomCrudMenu
                    onPreview={() => onPreview(data.id)}
                    onUpdate={() => onUpdate(data.id)}
                    onDelete={() => onDelete(data)}
                />
            </div>
        </div>
    ) : (
        <CustomProductCardSkeleton />
    );
}

CustomProductCard.defaultProps = {
    //
};

CustomProductCard.propTypes = {
    data: PropTypes.object,
    onPreview: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
};

const CustomProductCardSkeleton = () => {
    const className1 = 'mb-1 w-[calc(100%-16px)] animate-pulse rounded bg-blue-gray-200 text-[14px] text-transparent';
    const className2 = 'animate-pulse rounded bg-blue-gray-400 text-[10px] text-transparent';
    return (
        <div className="relative flex animate-pulse flex-wrap items-center gap-3 rounded-lg border border-blue-gray-100 p-3 shadow-lg lg:flex-nowrap">
            <div className="min-w-[100px] w-1/3 shrink-0 md:w-[calc(100%/8)]">
                <div className="relative w-full pt-[100%]">
                    <div className="absolute inset-0 animate-pulse overflow-hidden rounded bg-blue-gray-200"></div>
                </div>
            </div>

            <div className="relative grid w-full grid-cols-4 gap-3 lg:grid-cols-5">
                <div className="col-span-3 lg:col-span-4">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                <div className="col-span-2">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                <div className="">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                <div className="">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                <div className="hidden lg:block">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>
            </div>
        </div>
    );
};

export default CustomProductCard;
