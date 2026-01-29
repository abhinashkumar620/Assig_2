import React from "react";
import { FaTiktok } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-white">
        <h1 className="text-3xl font-bold mb-4">TikTok Ads Creative Flow</h1>
        <p className="mb-6">Connect your TikTok Ads account to start building your creative.</p>
        <button
          onClick={() => loginWithRedirect()}
          className="flex items-center gap-2 px-6 py-3 border border-white/40 rounded-full hover:bg-white hover:text-black transition-all"
        >
          <FaTiktok /> Connect TikTok Ads Account
        </button>
      </div>
    </div>
  );
};

export default Home;
