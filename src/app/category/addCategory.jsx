import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import http_request from '../../../http-request';
import { Button } from '@mui/material';
import { ToastMessage } from '@/app/components/common/Toastify';
import { ReactLoader } from '../components/common/Loading';

const AddCategory = ({ existingDesign, RefreshData, onClose }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const AddCategoryData = async (data) => {
        try {
            setLoading(true);
    
            // Create FormData to handle text and file data
            
            const endpoint = existingDesign?._id ? `/editMehndiCategory/${existingDesign._id}` : '/addMehndiCategory';
            const response = existingDesign?._id 
                ? await http_request.patch(endpoint, data) 
                : await http_request.post(endpoint, data );
    
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
        AddCategoryData(data);
    };

    useEffect(() => {
        if (existingDesign) {
            setValue('categoryName', existingDesign.categoryName);
            setValue('description', existingDesign.description);
           
        }
    }, [existingDesign, setValue]);

    return (
        <div>
            {loading ? (
                <div className='w-[300px] h-[300px]'>
                    <ReactLoader isModel={true}/>
                </div>
            ) : (
                <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div className='w-[400px]'>
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-900">Category Name</label>
                        <input
                            id="name"
                            name="categoryName"
                            type="text"
                            required
                            {...register('categoryName', { required: 'Category Name is required' })}
                            className={`block w-full p-3 rounded-md border border-gray-300 ${errors.categoryName ? 'border-red-500' : ''}`}
                        />
                        {errors.categoryName && <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>}
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

                   
                    

                    <Button type="submit" variant="contained" color="primary" className="mt-4">
                        {existingDesign ? 'Update Category' : 'Add Category'}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default AddCategory;
