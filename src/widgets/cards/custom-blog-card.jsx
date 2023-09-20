import { Chip, Rating, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { CustomCrudMenu, CustomCurrencyDisplay } from '../partials';
import { StarIcon } from '@heroicons/react/24/solid';

export function CustomBlogCard({ data, onPreview, onUpdate, onDelete }) {
    const { img, title, description, tag, route, members } = data;
    return data ? (
        <Card key={title} color="transparent" shadow={false}>
            <CardHeader floated={false} color="gray" className="mx-0 mt-0 mb-4 h-64 xl:h-40">
                <img src={img} alt={title} className="h-full w-full object-cover" />
            </CardHeader>
            <CardBody className="py-0 px-1">
                <Typography variant="small" className="font-normal text-blue-gray-500">
                    {tag}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mt-1 mb-2">
                    {title}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-500">
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                <Link to={route}>
                    <Button variant="outlined" size="sm">
                        view project
                    </Button>
                </Link>
                <div>
                    {members.map(({ img, name }, key) => (
                        <Tooltip key={name} content={name}>
                            <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                    key === 0 ? '' : '-ml-2.5'
                                }`}
                            />
                        </Tooltip>
                    ))}
                </div>
            </CardFooter>
        </Card>
    ) : (
        <CustomProductCardSkeleton />
    );
}

CustomBlogCard.defaultProps = {
    //
};

CustomBlogCard.propTypes = {
    data: PropTypes.object,
    onPreview: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
};

const CustomProductCardSkeleton = () => {
    const className1 =
        'mb-1 w-[calc(100%-20px)] animate-pulse rounded bg-blue-gray-200 text-[14px] text-transparent';
    const className2 = 'animate-pulse rounded bg-blue-gray-400 text-[10px] text-transparent';
    return (
        <div className="relative flex flex-wrap items-center gap-3 rounded-lg border border-blue-gray-100 p-3 shadow-lg md:flex-nowrap">
            <div className="relative grid w-full grid-cols-4 gap-2 text-blue-gray-500 md:grid-cols-12 md:gap-3">
                <div className="relative row-span-2 pt-[100%] md:col-span-1 md:row-span-1">
                    <div className="absolute inset-0 animate-pulse overflow-hidden rounded bg-blue-gray-200"></div>
                </div>

                <div className="col-span-3 flex flex-col justify-center md:row-span-1">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                <div className="col-span-3 flex flex-col justify-center md:col-span-2">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                <div className="col-span-3 flex flex-col justify-center md:col-span-2">
                    <Typography className={className1}>1</Typography>
                    <Typography className={className2}>2</Typography>
                </div>

                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex flex-col justify-center text-center">
                        <Typography className={className1}>1</Typography>
                        <Typography className={className2}>2</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomBlogCard;
