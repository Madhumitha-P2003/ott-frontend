import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useMyList } from "../../context/MyListContext";

function Dashboard({ user, isSubscribed }) {
  const navigate = useNavigate();
  const { myList } = useMyList();

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <h2>
          Welcome back 👋 <span>{user.name}</span>
        </h2>

        <p className="sub-status">
          Subscription:
          <span className={isSubscribed ? "active" : "inactive"}>
            {isSubscribed ? " Active" : " Not Subscribed"}
          </span>
        </p>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/mylist")}>
          My List ({myList.length})
        </button>

        <button onClick={() => navigate("/new")}>
          New & Popular
        </button>

        {!isSubscribed && (
          <button
            className="subscribe"
            onClick={() => navigate("/subscription")}
          >
            Subscribe Now
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
