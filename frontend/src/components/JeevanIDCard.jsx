import { FaHeart, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { GiWaterDrop, GiTriangleTarget } from "react-icons/gi";
import { QRCodeCanvas } from 'qrcode.react';


const JeevanIDCard = ({ data }) => {
    if (!data) return null;

    // URL for QR code
    const qrUrl = `${window.location.origin}/jeevanid/${data.personContact}`;

    return (
        <div className="max-w-md mx-auto border border-gray-200 shadow-lg overflow-hidden rounded-lg bg-white">
            {/* Header stripe */}
            <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-emerald-500"></div>

            <div className="p-6">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaHeart className="w-5 h-5 text-red-600" />
                        <h2 className="text-lg font-bold text-red-600">JeevanID</h2>
                    </div>
                    <p className="text-xs text-gray-500">Digital Health Card</p>
                </div>

                {/* Photo & Basic Info */}
                <div className="flex gap-3 mb-4">
                    <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-gray-300 overflow-hidden">
                        {data.photo ? (
                            <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
                        ) : (
                            <FaHeart className="h-8 w-8 text-gray-400" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg truncate">{data.name || 'N/A'}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span>Age: {data.age || 'N/A'}</span>
                            <div className="flex items-center pl-2">
                                <GiWaterDrop className="h-3 w-3" />
                                <span>{data.bloodGroup || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex gap-2 mb-1 items-center">
                        <FaPhone className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Emergency Contact:</span>
                        <div>
                            <p className="text-sm text-red-700">{data.emergencyContact || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <FaMapMarkerAlt className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Address</span>
                    </div>
                    <p className="text-sm text-gray-500 flex">{data.address || 'N/A'}</p>
                </div>

                {/* Medical Info */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <GiTriangleTarget className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Medical Information</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-xs font-medium text-orange-800 flex">Allergies:</span>
                        <p className="text-sm text-gray-500 flex">{data.allergies || 'N/A'}</p>
                    </div>
                    <div>
                        <span className="text-xs font-medium text-orange-800 flex">Conditions:</span>
                        <p className="text-sm text-gray-500 flex">{data.medicalConditions || 'N/A'}</p>
                    </div>
                </div>

                {/* QR Code */}
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto">
                        <QRCodeCanvas value={qrUrl} size={96} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Scan for emergency access</p>
                </div>
            </div>
        </div>
    );
};

export default JeevanIDCard;
