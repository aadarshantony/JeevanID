import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import JeevanIDCard from '../components/JeevanIDCard';
import toast from 'react-hot-toast';
import { fetchJeevanID } from '../services/register';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
});

const ViewId = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const cardRef = useRef();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setUserData(null);
        try {
            const response = await fetchJeevanID(data.phone);
            setUserData(response);
        } catch (err) {
            console.error('Error fetching JeevanID:', err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadCard = async () => {
        if (cardRef.current) {
            try {
                const dataUrl = await htmlToImage.toPng(cardRef.current);
                download(dataUrl, `${userData.name}_JeevanID.png`);
            } catch (err) {
                console.error('Error downloading card:', err);
                toast.error('Failed to download JeevanID.');
            }
        }
    };

    const handleReportAccident = () => {
        if (userData?.personContact) {
            // Redirect to report page with victimPhone as query param
            navigate(`/report?victimPhone=${userData.personContact}`);
        } else {
            navigate('/report');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-25 via-white to-orange-100 py-8">
            <div className="container mx-auto px-4 mt-20">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="flex items-center justify-center gap-2 font-bold text-tricolor text-2xl sm:text-3xl md:text-4xl">
                            Get your JeevanID
                        </h2>
                        <p className="text-gray-500">
                            Quick fetching and downloading of your JeevanID
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="p-6">
                            <div>
                                <label className="block mb-1 font-medium">Your Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your contact number"
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300 ${errors.phone ? 'border-red-500' : ''
                                        }`}
                                    {...register('phone')}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <button
                                type="submit"
                                className="w-full font-semibold py-2 px-6 rounded-lg shadow-lg bg-orange-500 text-white hover:scale-105 transition-transform"
                            >
                                Fetch JeevanID
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-col items-center gap-4">
                        {loading && (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
                                <span className="text-gray-500 font-medium">Fetching JeevanID...</span>
                            </div>
                        )}

                        {!loading && userData && (
                            <>
                                <div ref={cardRef}>
                                    <JeevanIDCard data={userData} />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                                    {/* Download Button */}
                                    <button
                                        onClick={downloadCard}
                                        className="cursor-pointer font-semibold py-2 px-6 rounded-lg shadow-lg bg-green-500 text-white hover:scale-105 transition-transform"
                                    >
                                        Download JeevanID
                                    </button>

                                    {/* Report Accident Button */}
                                    <button
                                        onClick={handleReportAccident}
                                        className="cursor-pointer font-semibold py-2 px-6 rounded-lg shadow-lg bg-red-500 text-white hover:scale-105 transition-transform"
                                    >
                                        Report Accident
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewId;
