import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaUpload, FaUserPlus, FaHeart, FaShieldAlt } from "react-icons/fa";
import toast from 'react-hot-toast'
import { registerUser } from "../services/register";
import { uploadImageToCloudinary } from "../services/imageUpload";
import { Link } from 'react-router-dom'

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .required("Age is required"),
  address: Yup.string().required("Address is required"),
  bloodGroup: Yup.string().required("Blood Group is required"),
  emergencyContact: Yup.string()
    .matches(/^[0-9]{10}$/, "Emergency Contact must be a 10-digit number")
    .required("Emergency Contact is required"),
  personContact: Yup.string()
    .matches(/^[0-9]{10}$/, "Your Contact number must be a 10-digit number")
    .required("Your Contact number is required"),
});

const Register = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setValue("photo", e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const userimg = await uploadImageToCloudinary(photo);
      const formData = {
        ...data,
        photo: userimg
      }
      await registerUser(formData);
      toast.success("Created JeevanID!");
      setLoading(false)
      console.log("Form Submitted :", formData);

    } catch (err) {
      console.error("SignUp failed: ", err.response?.data || err.message);
      toast.error(err?.message)
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-25 via-white to-orange-100 py-8">
      <div className="container mx-auto px-4 mt-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2
              className="flex items-center justify-center gap-2 font-bold 
               text-tricolor text-2xl sm:text-3xl md:text-4xl"
            >
              <FaHeart className="text-orange-600 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              <span>JeevanID Registration</span>
            </h2>
            <p className="text-gray-500">
              Create your digital health card for emergency response
            </p>
          </div>

          {/* Card */}
          <div className="bg-white shadow-lg rounded-lg border border-orange-100">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-100">
              <h2 className="flex items-center gap-2 font-semibold text-lg text-gray-800">
                <FaUserPlus /> Personal Information
              </h2>
              <p className="text-sm text-gray-500">
                Fill in your details to generate your JeevanID health card
              </p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name & Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("name")}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Age *</label>
                    <input
                      type="number"
                      placeholder="Enter your age"
                      {...register("age")}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
                    />
                    {errors.age && (
                      <p className="text-red-500 text-sm">{errors.age.message}</p>
                    )}
                  </div>
                </div>

                {/* Photo */}
                <div>
                  <label className="block mb-1 font-medium">Profile Photo *</label>
                  <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="photo"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <FaUpload className="h-8 w-8 text-orange-400" />
                      <span className="text-sm text-gray-500">
                        {photo ? photo.name : "Click to upload your photo"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block mb-1 font-medium">Address *</label>
                  <textarea
                    placeholder="Enter your complete address"
                    {...register("address")}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                  )}
                </div>

                {/* Blood Group & Emergency Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">Blood Group *</label>
                    <select
                      {...register("bloodGroup")}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
                    >
                      <option value="">Select blood group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                    {errors.bloodGroup && (
                      <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Emergency Contact *</label>
                    <input
                      type="tel"
                      placeholder="Enter emergency contact number"
                      {...register("emergencyContact")}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
                    />
                    {errors.emergencyContact && (
                      <p className="text-red-500 text-sm">
                        {errors.emergencyContact.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Your Phone number *</label>
                  <input
                    type="tel"
                    placeholder="Enter Your contact number"
                    {...register("personContact")}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
                  />
                  {errors.personContact && (
                    <p className="text-red-500 text-sm">
                      {errors.personContact.message}
                    </p>
                  )}
                </div>

                {/* Allergies */}
                <div>
                  <label className="block mb-1 font-medium">Known Allergies</label>
                  <textarea
                    placeholder="List any known allergies (optional)"
                    {...register("allergies")}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
                  />
                </div>

                {/* Medical Conditions */}
                <div>
                  <label className="block mb-1 font-medium">Medical Conditions</label>
                  <textarea
                    placeholder="List any existing medical conditions (optional)"
                    {...register("medicalConditions")}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-4 space-y-2 lg:space-y-0">
                  <button
                    type="submit"
                    disabled={!!loading}
                    className={`w-full lg:flex-1 ${loading ? "bg-orange-500/50 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"} text-white font-medium py-2 rounded-lg  transition flex items-center justify-center gap-2`}
                  >
                    <FaShieldAlt />
                    {loading ? "Generating ID..." : "Generate JeevanID"}
                  </button>
                  <p className="text-center pt-2">View your <Link to={'/jeevanid'} className="text-tricolor underline">jeevanID</Link></p>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
