import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import http_request from '../../../http-request';
import { Button } from '@mui/material';
import { ToastMessage } from '@/app/components/common/Toastify';
import { ReactLoader } from '../components/common/Loading';

const AddDesign = ({ existingDesign, categories, RefreshData, onClose }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

    const AddDesignData = async (data) => {
        try {
            setLoading(true);

            // Create FormData to handle text and file data
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('review', data.review);
            formData.append('rating', data.rating);
            formData.append('discount', data.discount);
            formData.append('status', 'ACTIVE'); // Default status
            formData.append('groupOrder', data.groupOrder || false); // Add groupOrder value

            // Only append image if a new image is selected
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]); // Attach image file if present
            }

            const endpoint = existingDesign?._id ? `/editDesignImage/${existingDesign._id}` : '/addMehndiDesign';
            const response = existingDesign?._id
                ? await http_request.patch(endpoint, formData)
                : await http_request.post(endpoint, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

            const { data: responseData } = response;
            ToastMessage(responseData);
            setLoading(false);
            RefreshData(responseData);
            onClose(true);
        } catch (err) {
            setLoading(false);
            ToastMessage(err?._message);
            onClose(true);
            console.log(err);
        }
    };

    const onSubmit = (data) => {
        AddDesignData(data);
    };

    useEffect(() => {
        if (existingDesign) {
            setValue('name', existingDesign.name);
            setValue('description', existingDesign.description);
            setValue('price', existingDesign.price);
            setValue('status', existingDesign.status);
            setValue('review', existingDesign.review);
            setValue('rating', existingDesign.rating);
            setValue('discount', existingDesign.discount);
            setValue('groupOrder', existingDesign.groupOrder || false); // Set groupOrder value
        }
    }, [existingDesign, setValue]);

    return (
        <div>
            {loading ? (
                <div className='w-[300px] h-[300px]'>
                    <ReactLoader isModel={true} />
                </div>
            ) : (
                <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className='w-[400px]'>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Design Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            {...register('name', { required: 'Design Name is required' })}
                            className={`block w-full p-3 rounded-md border border-gray-300 ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            required
                            {...register('description', { required: 'Description is required' })}
                            className={`block w-full p-3 rounded-md border border-gray-300 ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className='w-[400px]'>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            required
                            {...register('price', { required: 'Price is required' })}
                            className={`block w-full p-3 rounded-md border border-gray-300 ${errors.price ? 'border-red-500' : ''}`}
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-900">Upload Image</label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            {...register('image', { required: !existingDesign ? 'Image is required' : false })}
                            className="block w-full p-3 rounded-md border border-gray-300"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="review" className="block text-sm font-medium text-gray-900">Review</label>
                        <input
                            id="review"
                            name="review"
                            type="number"
                            defaultValue={0}
                            {...register('review')}
                            className="block w-full p-3 rounded-md border border-gray-300"
                        />
                    </div>

                    {/* Rating Input */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-900">Rating</label>
                        <input
                            id="rating"
                            name="rating"
                            type="number"
                            step="0.1"
                            defaultValue={0}
                            {...register('rating')}
                            className="block w-full p-3 rounded-md border border-gray-300"
                        />
                    </div>

                    {/* Discount Input */}
                    <div>
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-900">Discount</label>
                        <input
                            id="discount"
                            name="discount"
                            type="number"
                            defaultValue={0}
                            {...register('discount')}
                            className="block w-full p-3 rounded-md border border-gray-300"
                        />
                    </div>
                    {/* Group Order Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="groupOrder"
                            name="groupOrder"
                            type="checkbox"
                            {...register('groupOrder')}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor="groupOrder" className="ml-2 text-sm text-gray-900">Enable Group Order</label>
                    </div>

                    <Button type="submit" variant="contained" color="primary" className="mt-4">
                        {existingDesign ? 'Update Design' : 'Add Design'}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default AddDesign;
