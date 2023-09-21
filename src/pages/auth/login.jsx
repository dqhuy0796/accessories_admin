import { login } from '@/redux/actions/userAction';
import { authService } from '@/services';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
    Typography
} from '@material-tailwind/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleToggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(username, password);
    };

    const handleLogin = async (username, password) => {
        try {
            const response = await authService.loginService(username, password);
            if (response && response.code === 'SUCCESS') {
                const { code, message, result, accessToken, refreshToken } = response;
                dispatch(
                    login({
                        user: result,
                        accessToken,
                        refreshToken,
                    }),
                );
                navigate('/dashboard/home');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid min-h-screen md:grid-cols-2">
            <img
                src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                className="hidden h-full w-full object-cover md:block"
            />
            <div className="grid w-full place-items-center">
                <Card className="shadow-none">
                    <form action="#" onSubmit={handleSubmit}>
                        <CardBody className="flex min-w-[320px] flex-col gap-4">
                            <Typography variant="h5" className="text-center">
                                Đăng nhập
                            </Typography>
                            <Input
                                type="text"
                                label="Email hoặc SĐT"
                                size="lg"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Mật khẩu"
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={
                                    <div
                                        className="cursor-pointer"
                                        onClick={handleToggleShowPassword}
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        )}
                                    </div>
                                }
                            />
                        </CardBody>
                        <CardFooter className="grid gap-4 pt-0">
                            <Button variant="gradient" fullWidth type="submit">
                                Đăng nhập
                            </Button>
                            <Link>
                                <Typography
                                    color="blue"
                                    className="text-center text-sm font-medium"
                                >
                                    Quên mật khẩu?
                                </Typography>
                            </Link>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Login;
