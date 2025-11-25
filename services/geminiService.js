export const generateAIResponse = async (prompt) => {
  try {
    const res = await fetch("https://unibridge-backend-gemini.onrender.com/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.reply || "No response";
  } catch (err) {
    console.error("Backend Error:", err);
    return "Server error. Please try again.";
  }
};
