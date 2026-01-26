import React from "react";
import { FaTiktok } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();


    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden px-4">

            {/* Background glow */}
            <div className="absolute top-0 left-0 w-60 h-60 sm:w-[500px] sm:h-[500px] bg-[#00f2ea] opacity-20 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 sm:w-[500px] sm:h-[500px] bg-[#ff0050] opacity-20 blur-[140px] rounded-full translate-x-1/2 translate-y-1/2" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md sm:max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-5 sm:p-10 shadow-2xl text-center">

                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                    TikTok Ads Creative Flow
                </h1>

                <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                    Create high-impact TikTok ads. Connect your TikTok Ads account to
                    start building your creative.
                </p>

                {/* Connect Button */}
                <div className="mt-4">
                    <button
                        onClick={() => {
                            toast.success("Redirecting to TikTok OAuth...");
                            setTimeout(() => {
                                navigate("/auth");
                            }, 1000);
                        }}
                        className="text-white border border-white/40 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-sm sm:text-base"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <FaTiktok className="text-base sm:text-xl" />
                            <span>Connect TikTok Ads Account</span>
                        </div>
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;
