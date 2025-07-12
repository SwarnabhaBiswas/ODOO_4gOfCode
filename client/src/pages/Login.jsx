export const Login = async (e, email, password) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Login successful!");
    // You can store session info here if needed
  } else {
    if (data.error?.includes("Invalid login credentials")) {
      alert("User not found or wrong password. Redirecting to signup...");
      window.location.href = "/signup";
    } else {
      alert(`Login failed: ${data.error}`);
    }
  }
};
