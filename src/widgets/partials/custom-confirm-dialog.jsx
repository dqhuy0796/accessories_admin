import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export function CustomConfirmDialog({
    handler,
    status,
    open,
    title,
    icon,
    text,
    countdown,
    btnConfirm,
    btnCancel,
    onConfirm,
    onCancel,
}) {
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (status === 'PENDING' || countdown) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [status, countdown]);

    return (
        <Dialog size="xs" open={open} handler={disabled ? handler : null}>
            <DialogHeader className="flex items-center justify-center text-base">
                <span>{title}</span>
            </DialogHeader>
            <DialogBody className="flex items-center justify-center gap-2 text-[15px] transition-all duration-300">
                {status === 'PENDING' ? <Spinner className="h-6 w-6" /> : icon}
                <div>
                    <Typography as={'p'} className="animation-float">
                        {text}
                    </Typography>
                    {countdown && (
                        <Typography as={'p'} className="animation-float">
                            Chuyển hướng sau:
                            <strong className="w-10 text-right">{countdown}s</strong>
                        </Typography>
                    )}
                </div>
            </DialogBody>
            <DialogFooter className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" color="gray" variant="text" onClick={onCancel} disabled={disabled}>
                    <span>{btnCancel}</span>
                </Button>
                <Button size="sm" color="blue" variant="text" onClick={onConfirm} disabled={disabled}>
                    <span>{btnConfirm}</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

CustomConfirmDialog.defaultProps = {
    open: false,
    status: 'READY',
    title: 'Dialog title',
    text: 'Dialog text',
    icon: <InformationCircleIcon className="h-8 w-8" />,
    btnCancel: 'Hủy',
    btnConfirm: 'Xác nhận',
};

CustomConfirmDialog.propTypes = {
    open: PropTypes.bool,
    handler: PropTypes.func,
    status: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.node,
    countdown: PropTypes.number,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default CustomConfirmDialog;
