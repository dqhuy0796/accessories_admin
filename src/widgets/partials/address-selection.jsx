import { Input } from '@material-tailwind/react';
import axios from 'axios';
import _, { add } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CustomSelectOption } from '.';
import { locationService } from '@/services';

export function AddressSelection({ address, onChange }) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const handleGetProvinces = async () => {
        setLoading(true);
        const response = await locationService.getProvincesService();
        if (response) {
            setProvinces(response.data.data);
            setError(null);
        } else {
            setError('province');
        }
        setLoading(false);
    };

    const handleGetDistricts = async (provinceCode) => {
        setLoading(true);
        const response = await locationService.getDistrictsService(provinceCode);
        if (response) {
            setDistricts(response.data.data);
            setError(null);
        } else {
            setError('district');
        }
        setLoading(false);
    };

    const handleGetWards = async (districtCode) => {
        setLoading(true);
        const response = await locationService.getWardsService(districtCode);
        if (response) {
            setWards(response.data.data);
            setError(null);
        } else {
            setError('ward');
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetProvinces();
    }, []);

    useEffect(() => {
        if (address.province) {
            const result = provinces.find((item) => item.name === address.province);
            if (result) {
                handleGetDistricts(result.code);
            } else {
                setDistricts([]);
            }
        }
    }, [address?.province, provinces]);

    useEffect(() => {
        if (address.district) {
            const result = districts.find((item) => item.name === address.district);
            if (result) {
                handleGetWards(result.code);
            } else {
                setWards([]);
            }
        }
    }, [address?.district, districts]);

    useEffect(() => {
        if (error) {
            if (error === 'province') {
                const timeout = setTimeout(() => {
                    handleGetProvinces();
                }, 10000);
                return () => clearTimeout(timeout);
            } else if (error === 'district') {
                const timeout = setTimeout(() => {
                    const result = provinces.find(
                        (item) => item?.name_with_type === address.province || item?.name === address.province,
                    );
                    handleGetDistricts(result.code);
                }, 10000);
                return () => clearTimeout(timeout);
            } else if (error === 'ward') {
                const timeout = setTimeout(() => {
                    const result = districts.find(
                        (item) => item?.name_with_type === address.district || item?.name === address.district,
                    );
                    handleGetWards(result.code);
                }, 10000);
                return () => clearTimeout(timeout);
            }
        }
    }, [error]);

    /** EVENT HANDLER */

    const handleProvinceChange = (value) => {
        const result = provinces.find((item) => item?.name_with_type === value || item?.name === value);

        if (result && result?.name_with_type !== address.province && result?.name !== address.province) {
            onChange('province', value);
            // reset lower level
            onChange('district', '');
            onChange('ward', '');
            setDistricts([]);
            setWards([]);
            // get new children
            handleGetDistricts(result.code);
        }
    };

    const handleDistrictChange = (value) => {
        const result = districts.find((item) => item?.name_with_type === value || item?.name === value);

        if (result && result?.name_with_type !== address.district && result?.name !== address.district) {
            onChange('district', value);
            // reset lower level
            onChange('ward', '');
            setWards([]);
            // get new children
            handleGetWards(result.code);
        }
    };

    const handleWardChange = (value) => {
        const result = wards.find((item) => item?.name_with_type === value || item?.name === value);

        if (result && result?.name_with_type !== address.ward && result?.name !== address.ward) {
            onChange('ward', value);
        }
    };

    const handleAddressChange = (e) => {
        onChange('location', e.target.value);
    };

    return (
        <div className="w-full">
            <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
                <CustomSelectOption
                    options={provinces}
                    variant={{
                        key: 'province',
                        label: 'Tỉnh/Thành phố thuộc Trung ương',
                    }}
                    value={address.province}
                    loading={isLoading && _.isEmpty(provinces)}
                    onSelect={handleProvinceChange}
                />
                <CustomSelectOption
                    options={districts}
                    variant={{
                        key: 'district',
                        label: 'Huyện/Quận/Thị xã/Thành phố',
                    }}
                    value={address.district}
                    loading={isLoading && _.isEmpty(districts) && !_.isEmpty(address.province)}
                    onSelect={handleDistrictChange}
                />
                <CustomSelectOption
                    options={wards}
                    variant={{
                        key: 'ward',
                        label: 'Xã/Phường/Thị trấn',
                    }}
                    value={address.ward}
                    loading={isLoading && _.isEmpty(wards) && !_.isEmpty(address.district)}
                    onSelect={handleWardChange}
                />
            </div>

            <Input
                size="lg"
                color="blue"
                label="Địa chỉ"
                value={address.location || ''}
                onChange={handleAddressChange}
                required
            />
        </div>
    );
}

AddressSelection.propTypes = {
    address: PropTypes.object,
    onChange: PropTypes.func,
};

export default AddressSelection;
