/* ================= BASE URL ================= */

const BASE = "https://ott-backend-b3rj.onrender.com";

const AUTH_BASE_URL = `${BASE}/api/auth`;
const MYLIST_BASE_URL = `${BASE}/api/my-list`;
const SUB_BASE_URL = `${BASE}/api/subscription`;


/* ================= HELPERS ================= */

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/* ================= AUTH ================= */

// REGISTER
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${AUTH_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error("Registration failed");

  return res.json();
};

// LOGIN (JWT)
export const loginUser = async (email, password) => {
  const res = await fetch(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid email or password");

  const data = await res.json();

  // 🔐 SAVE JWT + USER
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/* ================= MY LIST ================= */

export const addToMyList = async (movieId) => {
  const res = await fetch(MYLIST_BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ movieId }),
  });

  if (!res.ok) throw new Error("Failed to add to My List");

  return res.json();
};

/* ================= SUBSCRIPTION ================= */

// ✅ JWT-BASED STATUS
export const checkSubscriptionStatus = async () => {
  const res = await fetch(`${SUB_BASE_URL}/status`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to check subscription");

  return res.json(); // true / false
};

// ✅ JWT-BASED SUBSCRIBE
export const subscribeUser = async (plan) => {
  const res = await fetch(`${SUB_BASE_URL}/subscribe?plan=${plan}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Subscription failed");

  return res.json();
};
