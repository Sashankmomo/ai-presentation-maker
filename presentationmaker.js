import React, { useState } from "react";
import axios from "axios";

const PresentationMaker = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSlides = async () => {
    if (!topic) return alert("Please enter a topic");
    setLoading(true);
    try {
      const response = await axios.post("https://api.openai.com/v1/completions", {
        model: "gpt-3.5-turbo",
        prompt: Create a 5-slide presentation outline on: ${topic},
        max_tokens: 200,
      }, {
        headers: { Authorization: Bearer ${process.env.REACT_APP_OPENAI_API_KEY} }
      });
      setSlides(response.data.choices[0].text.split("\n").filter(Boolean));
    } catch (error) {
      console.error("Error generating slides", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Presentation Maker</h1>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        onClick={generateSlides}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Slides"}
      </button>
      <div className="mt-4">
        {slides.map((slide, index) => (
          <div key={index} className="p-2 border-b">{slide}</div>
        ))}
      </div>
    </div>
  );
};

export default PresentationMaker;
