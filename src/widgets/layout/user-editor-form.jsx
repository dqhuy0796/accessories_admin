import PropTypes from 'prop-types';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { HeartIcon } from '@heroicons/react/24/solid';

export function UserEditorForm({ brandName, brandLink, routes }) {
    return (
        <Card>
            <CardBody className="p-4">
                <div className="mb-10 grid gap-6">
                    <div className="flex items-center gap-6">
                        <div className="group relative overflow-hidden rounded-full">
                            <Avatar
                                src={avatar_url || '/img/bruce-mars.jpeg'}
                                alt={name}
                                size="xxl"
                                withBorder={true}
                                color="green"
                                className="rounded-lg p-0.5 shadow-lg shadow-blue-gray-500/40"
                            />

                            <div className="absolute left-0 right-0 bottom-0 grid h-1/3 translate-y-full cursor-pointer place-items-center bg-gray-500/50 transition-transform duration-300 group-hover:translate-y-0">
                                <PencilIcon className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div>
                            <Typography variant="h5" className="mb-1 flex items-center gap-2">
                                {name}
                            </Typography>
                            <Typography variant="small" className="font-normal">
                                {displayPosition(user.role_id)}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="">
                    <Typography variant="small" className="font-normal">
                        {bio || ''}
                    </Typography>

                    <hr className="my-8 border-blue-gray-100" />

                    <ul className="flex flex-col gap-4 p-0">
                        <li className="flex items-center gap-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold capitalize"
                            >
                                Mobile:
                            </Typography>
                            <Input value={phone_number} />
                        </li>
                    </ul>
                </div>
            </CardBody>
        </Card>
    );
}

UserEditorForm.defaultProps = {};

UserEditorForm.propTypes = {
    brandName: PropTypes.string,
    brandLink: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
};

export default UserEditorForm;
