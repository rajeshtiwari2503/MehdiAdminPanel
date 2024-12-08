import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import http_request from '../../../http-request';

const EditUserProfile = ({ isVisible, RefreshData, onClose, user }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user?.name || "");
      setValue("email", user?.email || "");
      setValue("address", user?.address || "");
      setValue("contact", user?.contact || "");
      setValue("password", user?.password || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await http_request.patch(`/editUser/${user?._id}`, data);
      RefreshData(response.data);
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      console.error(err);
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Name"
                  {...field}
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-500"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  type="email"
                  placeholder="Email"
                  {...field}
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-500"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="address"
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Address"
                  {...field}
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-500"
                />
              )}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="contact"
              rules={{
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              }}
              render={({ field }) => (
                <input
                  type="tel"
                  placeholder="Contact"
                  {...field}
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-500"
                />
              )}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-indigo-500"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-500 text-white py-2 rounded-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-red-500 text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
