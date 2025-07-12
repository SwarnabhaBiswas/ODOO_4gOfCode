export const Login = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Login successful!");
    // Store user session/token if needed (optional)
  } else {
    alert(`Login failed: ${data.error}`);
  }
};
