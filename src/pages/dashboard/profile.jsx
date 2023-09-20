import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
    IconButton,
} from '@material-tailwind/react';
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ProfileInfoCard, MessageCard } from '@/widgets/cards';
import { platformSettingsData, conversationsData, projectsData } from '@/data';
import { useSelector } from 'react-redux';

export function Profile() {
    const user = useSelector((state) => state.user.data);
    console.log(user);

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
                                    src="/img/bruce-mars.jpeg"
                                    alt="bruce-mars"
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
                                    {user?.name}
                                    <span className="relative h-2 w-2 rounded-full bg-gradient-to-br from-green-300 to-green-600 shadow-all shadow-green-200"></span>
                                </Typography>
                                <Typography variant="small" className="font-normal">
                                    {displayPosition(user.role_id)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="mb-12 grid gap-12 px-4 lg:grid-cols-2">
                        <ProfileInfoCard
                            title="Profile"
                            description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                            details={{
                                mobile: user.phone_number,
                                email: user.email,
                                location: user.address,
                                social: (
                                    <div className="mt-1 flex items-center gap-4">
                                        <i className="fa-brands fa-facebook text-blue-700" />
                                        <i className="fa-brands fa-twitter text-blue-400" />
                                        <i className="fa-brands fa-instagram text-purple-500" />
                                    </div>
                                ),
                            }}
                            action={
                                <Tooltip content="Chỉnh sửa">
                                    <Link to={'/dashboard/profile/update'}>
                                        <IconButton size="sm" variant="text">
                                            <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                            }
                        />
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Tin nhắn hệ thống
                            </Typography>
                            <ul className="grid gap-6">
                                {conversationsData.map((props) => (
                                    <MessageCard
                                        key={props.name}
                                        {...props}
                                        action={
                                            <Button variant="text" size="sm">
                                                reply
                                            </Button>
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Profile;
