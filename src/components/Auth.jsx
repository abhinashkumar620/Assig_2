import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer ,toast} from "react-toastify";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // OAuth success (mock)
     toast.success("TikTok Ads account connected successfully 🎉");
    const mockToken = "TIKTOK_ACCESS_TOKEN_123";

    // token save
    localStorage.setItem("tiktok_token", mockToken);

    // redirect to form
    navigate("/create-ad");
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Connecting TikTok Ads Account...</h2>

      <ToastContainer/>
    </div>
  );
};

export default Auth;
