import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import http_request from '../../../http-request';
import { Button } from '@mui/material';
import { ToastMessage } from '@/app/components/common/Toastify';
import { ReactLoader } from '../components/common/Loading';

const AddCategory = ({ existingDesign,categories, RefreshData, onClose }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const AddCategoryData = async (data) => {
        try {
            setLoading(true);
            
//    const cate= categories?.find((f)=>f?._id===data?.category)

            // Create FormData to handle text and file data
            const formData = new FormData();
            formData.append('categoryName', data.categoryName);
            formData.append('description', data.description);
            // formData.append('categoryName', cate.categoryName);
            // formData.append('categoryId', cate._id);
            // formData.append('price', data.price);
            formData.append('status', 'ACTIVE');  // Default status
    
            // Only append image if a new image is selected
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);  // Attach image file if present
            }
    
            const endpoint = existingDesign?._id ? `/editMehndiCategory/${existingDesign._id}` : '/addMehndiCategory';
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
        AddCategoryData(data);
    };
 

    useEffect(() => {
        if (existingDesign) {
            setValue('categoryName', existingDesign.categoryName);
            setValue('description', existingDesign.description);
            // setValue('categoryName', existingDesign.categoryName);
            // setValue('categoryId', existingDesign.categoryId);
            // setValue('price', existingDesign.price);
            setValue('status', existingDesign.status);
           
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
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Design Name</label>
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

                    <Button type="submit" variant="contained" color="primary" className="mt-4">
                        {existingDesign ? 'Update Category' : 'Add Category'}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default AddCategory;
