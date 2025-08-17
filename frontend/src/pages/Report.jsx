import { TiWarning } from "react-icons/ti";
import { TbSend } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { uploadImageToCloudinary } from "../services/imageUpload";
import { submitAccidentReport } from "../services/reports";

// Validation schema
const reportValidationSchema = Yup.object().shape({
  phone: Yup.string().required("Your phone number is required!"),
  info: Yup.string(),
  photo: Yup.mixed(),
});

const Report = () => {
  const [photo, setPhoto] = useState(null);
  const [locationCoords, setLocationCoords] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [victimPhone, setVictimPhone] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reportValidationSchema),
  });

  const routerLocation = useLocation();

  // Check for victimPhone from query params (if QR scanned)
  useEffect(() => {
    const params = new URLSearchParams(routerLocation.search);
    const phoneFromQR = params.get("victimPhone");
    if (phoneFromQR) {
      setVictimPhone(phoneFromQR);
      toast.success("Victim details pre-filled from JeevanID!");
    }
  }, [routerLocation.search, setValue]);

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setValue("photo", e.target.files[0]);
    }
  };

  const handleCaptureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          setLocationCoords(coords);
          setValue("location", coords);
          toast.success("Captured current location!");
        },
        (err) => {
          toast.error("Failed to capture location. Please allow location access.");
          console.log("Location Error: ", err);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Submit handler
  const submitReport = async (data) => {
    setIsSubmitting(true);
    try {
      let photoUrl = null;
      if (photo) {
        photoUrl = await uploadImageToCloudinary(photo);
      }

      const finalData = {
        ...data,
        victimPhone: victimPhone || undefined,
        location: locationCoords,
        photo: photoUrl,
      };

      console.log("Form data:", finalData);

      await submitAccidentReport(finalData);

      toast.success(
        "Emergency report submitted successfully! The medics will arrive soon"
      );
    } catch (err) {
      console.error("Error submitting report:", err);
      toast.error(err.message || "Failed to submit the emergency report.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-25 via-white to-orange-100 py-8">
      <div className="container mx-auto px-4 mt-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="flex items-center justify-center gap-2 font-bold text-tricolor text-2xl sm:text-3xl md:text-4xl">
              <TiWarning className="text-orange-600 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
              <span>Report Emergency</span>
            </h2>
            <p className="text-gray-500">
              Quick reporting of medical conditions to save lives
            </p>
          </div>

          {/* Location */}
          <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="flex items-center gap-2 font-bold text-xl">
                <FaLocationDot />
                Location
              </h2>
              <p className="text-gray-500 pt-2">
                Your current location will help emergency services reach the scene faster
              </p>
            </div>
            <div className="px-6 mb-5 flex gap-2">
              <button
                type="button"
                onClick={handleCaptureLocation}
                disabled={!!locationCoords}
                className={`font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform duration-200 ${locationCoords
                  ? "bg-green-700/50 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white hover:scale-105 cursor-pointer"
                  }`}
              >
                {locationCoords ? "Location Captured" : "Capture Current Location"}
              </button>

              {locationCoords && (
                <button
                  type="button"
                  onClick={() => {
                    setLocationCoords("");
                    toast.error("Location cleared. Please capture before reporting");
                  }}
                  className="font-semibold cursor-pointer py-2 px-6 rounded-lg shadow-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
            {locationCoords && (
              <p className="text-gray-500 mt-2 text-sm px-6 mb-5">{locationCoords}</p>
            )}
          </div>

          {/* Situation */}
          <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="flex items-center gap-2 font-bold text-xl">Situation Details</h2>
              <p className="text-gray-500 pt-2">Information to help emergency responders</p>
            </div>

            <form onSubmit={handleSubmit(submitReport)}>
              <div className="px-6 pb-5">
                <label className="block mb-1 font-medium">Your Phone Number</label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="Your contact number for follow-up"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none ${errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                />
              </div>

              <div className="px-6 pb-5">
                <label className="block mb-1 font-medium">Additional Information</label>
                <textarea
                  {...register("info")}
                  placeholder="Describe the accident scene, vehicles involved, traffic, injuries, location details or anything related"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none border-gray-300 h-40"
                />
              </div>

              <div className="px-6 pb-5">
                <label className="block mb-1 font-medium">Photo of Scene (optional)</label>
                <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label htmlFor="photo" className="cursor-pointer flex flex-col items-center gap-2">
                    <FaUpload className="h-8 w-8 text-orange-400" />
                    <span className="text-sm text-gray-500">
                      {photo ? photo.name : "Click to upload photo"}
                    </span>
                  </label>
                </div>

                <div className="pb-5 text-center">
                  <button
                    type="submit"
                    disabled={!!isSubmitting}
                    className={`flex items-center w-full mt-6 h-16 rounded-xl justify-center text-white text-xl font-bold gap-2 transition-colors ${isSubmitting
                      ? "bg-red-500/50 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 cursor-pointer"
                      }`}
                  >
                    <TbSend /> {isSubmitting ? "Submiting...." : "Submit Emergency Report"}
                  </button>
                  <p className="text-gray-500 mt-3">Please capture your location before submitting</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
