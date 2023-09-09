import { Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

export function CustomCurrencyDisplay({ value, className }) {
    
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 2}
    const formatedValue = new Intl.NumberFormat('vi-VN', config).format(value);

    return (
            <Typography className={className}>
                {formatedValue}
            </Typography>
    );
}

CustomCurrencyDisplay.propTypes = {
    value: PropTypes.number,
    className: PropTypes.string,

};

export default CustomCurrencyDisplay;
