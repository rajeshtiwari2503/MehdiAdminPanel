import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import http_request from '../../../http-request';
import { Button } from '@mui/material';
import { ToastMessage } from '@/app/components/common/Toastify';
import { ReactLoader } from '../components/common/Loading';

const AddDesign = ({ existingDesign, RefreshData, onClose }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const AddDesignData = async (data) => {
        try {
            setLoading(true);

            const reqData = {
                ...data,
                status: "ACTIVE"  // Default status
            };

            const endpoint = existingDesign?._id ? `/editMehndiDesign/${existingDesign._id}` : '/addMehndiDesign';
            const response = existingDesign?._id 
                ? await http_request.patch(endpoint, reqData) 
                : await http_request.post(endpoint, reqData);
                
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
            setValue('title', existingDesign.title);
            setValue('image', existingDesign.image);
            setValue('status', existingDesign.status);
        }
    }, [existingDesign, setValue]);

    return (
        <div>
            {loading ? (
                <div className='w-[300px] h-[300px]'>
                    <ReactLoader  isModel={true}/>
                </div>
            ) : (
                <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            {...register('title', { required: 'Title is required' })}
                            className={`block w-full p-3 rounded-md border border-gray-300 ${errors.title ? 'border-red-500' : ''}`}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-900">Image URL</label>
                        <input
                            id="image"
                            name="image"
                            type="text"
                            required
                            {...register('image', { required: 'Image URL is required' })}
                            className={`block w-full p-3 rounded-md border border-gray-300 ${errors.image ? 'border-red-500' : ''}`}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
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
