import { imageService } from '@/services';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { IconButton, Typography } from '@material-tailwind/react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CustomImageUpload({ images, onChange }) {
    const handleRemoveImage = async (img) => {
        const updatedImages = images.filter((item) => item.public_id !== img.public_id);
        if (updatedImages.length < images.length) {
            const result = handleCloudinaryRollback(img.public_id);
            if (result) {
                toast.info(`Đã xóa ảnh [${img.original_filename}]`);
                onChange(updatedImages);
            }
        }
    };

    const handleImagesChange = (event) => {
        const files = event.target.files;
        console.log(files);

        if (files.length > 0) {
            const selectedImages = Array.from(files).map((image) => {
                const reader = new FileReader();

                return new Promise((resolve) => {
                    reader.onload = (e) => {
                        const imagePath = e.target.result;
                        resolve({
                            name: image.name,
                            image_url: imagePath,
                        });
                    };
                    reader.readAsDataURL(image);
                });
            });

            Promise.all(selectedImages).then((results) => {
                const allImages = images ? [...images, ...results] : results;

                const uploadedImages = allImages.filter((item, index, self) => {
                    return self.findIndex((image) => image.name === item.name) === index;
                });

                if (allImages.length > uploadedImages.length) {
                    toast.info(`Đã xóa ${allImages.length - uploadedImages.length} ảnh trùng lặp!`);
                }

                onChange(uploadedImages);
            });
        }
    };

    const handleCloudinaryRollback = async (public_id) => {
        const destroyImages = [{ public_id }];
        const response = await imageService.rollbackCloudUpload(destroyImages);

        if (response && response.code === 'SUCCESS') {
            return true;
        }
        return false;
    };

    const handleCloudinaryUpload = () => {
        window.cloudinary.openUploadWidget(
            {
                cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
                uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET,

                cropping: true,
                croppingAspectRatio: 1,
                croppingShowDimensions: true,
                croppingDefaultEnabled: true,
                croppingShowSkipCropButton: false,
                clientAllowedFormats: ['image'],
                maxImageFileSize: 5000000,
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    console.log(result);
                    const { original_filename, public_id, secure_url, thumbnail_url } = result.info;
                    const updatedImages = images
                        ? [...images, { original_filename, public_id, secure_url, thumbnail_url }]
                        : [{ original_filename, public_id, secure_url, thumbnail_url }];
                    onChange(updatedImages);
                }
            },
        );
    };

    return (
        <div className="grid my-4 gap-4">
            {images && !_.isEmpty(images) && (
                <ul className="grid h-full w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 transition-all duration-300">
                    {images.map((img, index) => (
                        <li key={index} className="w-auto min-w-[100px] max-w-[160px]">
                            <Image
                                src={img?.image_url || img?.secure_url}
                                alt={img?.public_id}
                                onDelete={() => handleRemoveImage(img)}
                            />
                        </li>
                    ))}
                </ul>
            )}

            <label className="block w-full cursor-pointer select-none rounded-lg border border-dashed border-blue-gray-300 bg-gray-50 p-2 hover:border-blue-500 hover:bg-blue-100/20">
                <div
                    onClick={handleCloudinaryUpload}
                    className="flex flex-col items-center justify-center pt-5 pb-6  text-gray-500"
                >
                    <Typography className="mb-2 text-sm font-semibold">{'Tải ảnh lên (Tối đa 12 ảnh)'}</Typography>
                    <Typography className="text-xs font-normal">{'SVG, PNG, JPG or GIF (MAX. 5Mb)'}</Typography>
                </div>
            </label>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={true}
                closeOnClick={false}
                newestOnTop={false}
                closeButton={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
                draggable
                rtl={false}
            />
        </div>
    );
}

CustomImageUpload.propTypes = {
    images: PropTypes.array,
    onChange: PropTypes.func,
};

export default CustomImageUpload;

const Image = ({ src, alt, onDelete }) => (
    <div className="animation-slide relative w-full select-none overflow-hidden rounded-md pt-[100%] shadow">
        <div className="absolute inset-0 overflow-hidden bg-gray-200">
            <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
        </div>
        <div className="absolute top-1.5 right-1.5">
            <IconButton
                color="white"
                variant="gradient"
                className=" h-6 w-6 rounded-full border border-transparent transition-all hover:rotate-180 hover:border-gray-500 hover:shadow-all"
                onClick={onDelete}
            >
                <XMarkIcon className="h-5 w-5" />
            </IconButton>
        </div>
    </div>
);
