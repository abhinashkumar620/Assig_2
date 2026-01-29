import React, { useState } from "react";
import { FaTiktok } from "react-icons/fa6";
import { MdLogout, MdOutlineFileUpload } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { Card } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import img from '../img/image.jpeg';

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

  const [submittedData, setSubmittedData] = useState(null);

  const { logout } = useAuth0();

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
    setSubmittedData(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow flex justify-between items-center px-8 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-black w-8 h-8 rounded flex items-center justify-center">
            <FaTiktok className="text-white" />
          </div>
          <h2 className="font-bold text-sm">Ads Manager</h2>
        </div>

        <MdLogout
          onClick={() => {
            toast.info("Logging out from TikTok Ads...");
            setTimeout(() => logout({ returnTo: window.location.origin }), 2000);
          }}
          className="cursor-pointer text-xl hover:text-red-500"
        />
      </nav>

      <div className="pt-20 px-4 flex flex-col sm:flex-row gap-6 w-[90%] mx-auto">
        {/* Form */}
        <div className="bg-white w-full sm:w-1/2 p-4 rounded shadow">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <CiCirclePlus className="text-red-500 text-xl" />
            <h2 className="font-bold">Create New Ad</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <input name="companyName" onChange={handleChange} placeholder="Company Name" className="w-full border p-2 rounded" />
            <select name="objective" onChange={handleChange} className="w-full border p-2 rounded">
              <option value="">Select Objective</option>
              <option value="Traffic">Traffic</option>
              <option value="Conversions">Conversions</option>
            </select>
            <textarea name="adText" onChange={handleChange} placeholder="Ad Text" className="w-full border p-2 rounded h-20" />
            <input name="cta" onChange={handleChange} placeholder="Call To Action" className="w-full border p-2 rounded" />

            {/* Music selection */}
            <div className="space-y-2">
              <div className="flex gap-2 flex-wrap">
                <button type="button" onClick={() => handleMusicType("existing")} className={`border px-3 py-1 rounded ${formData.musicType === "existing" ? "bg-red-500 text-white" : ""}`}>Existing</button>
                <button type="button" onClick={() => handleMusicType("upload")} className={`border px-3 py-1 rounded flex items-center gap-1 ${formData.musicType === "upload" ? "bg-red-500 text-white" : ""}`}><MdOutlineFileUpload /> Upload</button>
                <button type="button" onClick={() => handleMusicType("no_music")} className={`border px-3 py-1 rounded ${formData.musicType === "no_music" ? "bg-red-500 text-white" : ""}`}>No Music</button>
              </div>

              {formData.musicType === "existing" && <input name="musicId" onChange={handleChange} placeholder="Music ID" className="w-full border p-2 rounded" />}
              {formData.musicType === "upload" && <input type="file" name="file" onChange={handleChange} />}
            </div>

            <button className="w-full bg-red-500 text-white py-2 rounded flex justify-center gap-2"><AiFillSafetyCertificate /> Submit</button>
          </form>
        </div>

        {/* Right UI */}
        <div className="bg-gray-200 w-full sm:w-1/2 p-4 rounded shadow flex flex-col items-center gap-4">
          <img src={img} alt="Product" className="w-full rounded-lg shadow" />

          {submittedData && (
            <Card title="JSON (Submitted Data)" className="shadow-lg w-full max-w-sm">
              <SyntaxHighlighter language="json" style={dark}>
                {JSON.stringify(submittedData, null, 2)}
              </SyntaxHighlighter>
            </Card>
          )}
        </div>
      </div>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default ContectForm;
