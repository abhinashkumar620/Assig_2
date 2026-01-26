import React, { useState } from "react";
import { FaTiktok } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import img from '../img/image.jpeg';
import { Card } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ContectForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        objective: "",
        adText: "",
        cta: "",
        musicType: "",
        musicId: "",
        file: null,
    });

    // New state to track submission
    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleMusicType = (type) => {
        setFormData(prev => ({
            ...prev,
            musicType: type,
            musicId: "",
            file: null
        }));
    };


    const validateForm = () => {
        if (formData.companyName.trim().length < 3) {
            toast.error("Company name must be at least 3 characters");
            return false;
        }
        if (!formData.objective) {
            toast.error("Please select an objective");
            return false;
        }
        if (!formData.adText.trim()) {
            toast.error("Ad text is required");
            return false;
        }
        if (!formData.cta.trim()) {
            toast.error("Call To Action is required");
            return false;
        }
        if (!formData.musicType) {
            toast.error("Please select a music option");
            return false;
        }
        if (formData.objective === "Conversions" && formData.musicType === "no_music") {
            toast.error("No music is not allowed for Conversions objective");
            return false;
        }
        if (formData.musicType === "existing" && !formData.musicId.trim()) {
            toast.error("Music ID is required");
            return false;
        }
        if (formData.musicType === "upload" && !formData.file) {
            toast.error("Please upload a music file");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        toast.success("TikTok Ad created successfully 🚀");
        // Set submitted data to show JSON preview
        setSubmittedData(formData);
    };
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("tiktok_token");

        if (!token) {
            toast.error("Please connect TikTok Ads account first");
            navigate("/");
        }
    }, []);


    return (
        <div className="min-h-screen bg-gray-100">
            {/* .......................Navbar....................... */}
            <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow flex justify-between items-center px-8 z-20">
                <div className="flex items-center gap-2">
                    <div className="bg-black w-8 h-8 rounded flex items-center justify-center">
                        <FaTiktok className="text-white " />
                    </div>
                    <h2 className="font-bold text-sm">Ads Manager</h2>
                </div>

                <MdLogout
                    onClick={() => {
                        toast.info("Logging out from TikTok Ads...");

                        setTimeout(() => {
                            localStorage.removeItem("tiktok_token");
                            navigate("/");
                        }, 2000);
                    }}
                    className="cursor-pointer text-xl hover:text-red-500"
                />

            </nav>

            {/* .......................ALL Content ....................... */}
            <div className="pt-20 px-4 flex flex-col sm:flex-row gap-6 w-[90%] mx-auto">
                {/* .......................FORM................... */}
                <div className="bg-white w-full sm:w-1/2 p-4 rounded shadow">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2">
                        <CiCirclePlus className="text-red-500 text-xl" />
                        <h2 className="font-bold">Create New Ad</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                        <div>
                            <label className="font-medium block mb-1">Company Name</label>
                            <input
                                name="companyName"
                                onChange={handleChange}
                                placeholder="Enter company name"
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="font-medium block mb-1">Objective</label>
                            <select
                                name="objective"
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Select Objective</option>
                                <option value="Traffic">Traffic</option>
                                <option value="Conversions">Conversions</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-medium block mb-1">Ad Text <span className="text-xs text-gray-500">(max 100)</span></label>
                            <textarea
                                name="adText"
                                maxLength={100}
                                onChange={handleChange}
                                className="w-full border p-2 rounded h-20"
                            />
                        </div>

                        <div>
                            <label className="font-medium block mb-1">Call To Action</label>
                            <input
                                name="cta"
                                onChange={handleChange}
                                placeholder="Shop Now"
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium block">Music Selection</label>
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    type="button"
                                    onClick={() => handleMusicType("existing")}
                                    className={`border px-3 py-1 rounded ${formData.musicType === "existing" ? "bg-red-500 text-white" : ""}`}
                                >
                                    Existing
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleMusicType("upload")}
                                    className={`border px-3 py-1 rounded flex items-center gap-1 ${formData.musicType === "upload" ? "bg-red-500 text-white" : ""}`}
                                >
                                    <MdOutlineFileUpload />
                                    Upload
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleMusicType("no_music")}
                                    className={`border px-3 py-1 rounded ${formData.musicType === "no_music" ? "bg-red-500 text-white" : ""}`}
                                >
                                    No Music
                                </button>
                            </div>

                            {formData.musicType === "existing" && (
                                <input
                                    name="musicId"
                                    onChange={handleChange}
                                    placeholder="Enter Music ID"
                                    className="w-full border p-2 rounded"
                                />
                            )}

                            {formData.musicType === "upload" && (
                                <label className="border-2 border-dashed border-gray-400 rounded p-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                                    <MdOutlineFileUpload className="text-xl" />
                                    Upload Music File
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                </label>
                            )}

                            {formData.musicType === "no_music" && (
                                <p className="text-gray-500 text-sm">
                                    No music selected (Traffic only)
                                </p>
                            )}
                        </div>

                        <button className="w-full bg-red-500 text-white py-2 rounded flex justify-center gap-2">
                            <AiFillSafetyCertificate /> Submit
                        </button>
                    </form>
                </div>

                {/* .......................RIGHT SIDE UI...................... */}
                <div className="bg-gray-200 w-full sm:w-1/2 p-4 rounded shadow flex flex-col items-center gap-4">
                    <div className="relative w-full max-w-sm">
                        <img
                            src={img}
                            alt="Product"
                            className="w-full rounded-lg shadow"
                        />

                        {/* Overlay info from bottom */}
                        <div className="absolute bottom-16 left-4 text-white space-y-1">
                            {formData.companyName && <h2 className="font-bold text-lg drop-shadow-md">{formData.companyName}</h2>}
                            {formData.objective && <p className="text-sm drop-shadow-md">{formData.objective}</p>}
                            {formData.adText && <p className="text-sm drop-shadow-md">{formData.adText}</p>}
                        </div>

                        {/* SHOP NOW button with dynamic CTA text */}
                        {formData.cta && <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-red-500 text-white py-2 px-4 rounded shadow-lg hover:bg-red-600">{formData.cta}</button>}
                    </div>

                    {/* Response JSON: show only after submit */}
                    {submittedData && (
                        <div className="w-full max-w-sm">
                            <Card title="JSON (Submitted Data)" className="shadow-lg">
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    <SyntaxHighlighter language="json" style={dark}>
                                        {JSON.stringify(submittedData, null, 2)}
                                    </SyntaxHighlighter>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer autoClose={3000} />
        </div>
    );
};

export default ContectForm;
