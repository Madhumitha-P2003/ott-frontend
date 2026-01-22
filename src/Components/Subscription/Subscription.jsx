import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { subscribeUser } from "../../api/api";
import "./Subscription.css";

function Subscription() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubscribe = async (plan) => {
    try {
      await subscribeUser(plan);

      setMessage("✅ Subscription activated successfully");

      setTimeout(() => {
        navigate("/home");
      }, 1200);

    } catch (err) {
      console.error(err);
      setMessage("❌ Subscription failed");
    }
  };

  return (
    <div className="subscription-page">
      <div className="subscription-box">
        <h1>Choose the plan that’s right for you</h1>

        {message && <p className="sub-message">{message}</p>}

        <div className="plans">
          <div className="plan">
            <h2>Basic</h2>
            <p>₹199 / month</p>
            <p>Good video quality</p>
            <button onClick={() => handleSubscribe("BASIC")}>
              Select
            </button>
          </div>

          <div className="plan active">
            <h2>Standard</h2>
            <p>₹499 / month</p>
            <p>Better video quality</p>
            <button onClick={() => handleSubscribe("STANDARD")}>
              Select
            </button>
          </div>

          <div className="plan">
            <h2>Premium</h2>
            <p>₹649 / month</p>
            <p>Best video quality</p>
            <button onClick={() => handleSubscribe("PREMIUM")}>
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
