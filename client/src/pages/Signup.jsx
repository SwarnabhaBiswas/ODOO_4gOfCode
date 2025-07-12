export const Signup = async (e, email, password) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Signup successful! Redirecting to login...");
    window.location.href = "/login";
  } else {
    alert(`Signup failed: ${data.error}`);
  }
};
