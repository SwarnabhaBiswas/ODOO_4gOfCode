export const Signup = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Signup successful!");
  } else {
    alert(`Signup failed: ${data.error}`);
  }
};
