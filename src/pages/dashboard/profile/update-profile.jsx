import { conversationsData } from '@/data';
import { MessageCard, ProfileInfoCard } from '@/widgets/cards';
import { PencilIcon } from '@heroicons/react/24/solid';
import {
    Avatar,
    Button,
    Card,
    CardBody,
    IconButton,
    Input,
    Tooltip,
    Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function ProfileUpdate() {
    const user = useSelector((state) => state.user.data);
    const [profile, setProfile] = useState(user);
    console.log(user);
    console.log(profile);

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

    const { name, phone_number, email, address, bio, avatar_url } = profile;

    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
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
        </>
    );
}

export default ProfileUpdate;
