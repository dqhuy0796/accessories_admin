import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Button, Checkbox, IconButton, Input, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import PropTypes from 'prop-types';

export function CustomTableMenu({ onCreate }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex w-full max-w-[24rem]">
                <Input type="search" label="Tìm kiếm" className="pr-16" />
                <IconButton
                    className={`invisible absolute right-1 top-1 bottom-1 flex items-center justify-center rounded-full bg-transparent`}
                >
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </IconButton>
            </div>
            <div className="relative flex w-full items-center justify-between gap-4 md:w-max">
                    <Button color="blue" variant="gradient" className="flex h-10 items-center gap-3 pl-4" onClick={onCreate}>
                        <PlusIcon className="h-5 w-5 text-white" />
                        <span>Tạo tài khoản</span>
                    </Button>

                <Menu placement="bottom-end">
                    <MenuHandler>
                        <div className="flex h-10 cursor-pointer select-none items-center gap-3 rounded-lg border border-blue-gray-700/50 px-4 py-2 text-sm text-blue-gray-700">
                            <FunnelIcon className="h-5 w-5 text-blue-gray-500" />
                            Bộ lọc
                        </div>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem className="p-0">
                            <label className="flex cursor-pointer items-center gap-2 p-2">
                                <Checkbox
                                    ripple={false}
                                    containerProps={{ className: 'p-0' }}
                                    className="hover:before:content-none"
                                />
                                Menu Item 1
                            </label>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
}

CustomTableMenu.defaultProps = {
    //
};

CustomTableMenu.propTypes = {
    onCreate: PropTypes.func,
};

export default CustomTableMenu;
