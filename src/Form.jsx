
import React, { useState, useEffect } from "react";

export default function Form() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      setLoggedUser(userObj);
      setToken(localStorage.getItem("token")); 
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loggedUser || !token) {
      alert("Please log in first to upload posts.");
      return;
    }

    const dataToSend = {
  imageUrl,
  title,
  description,
  userId: loggedUser.id  
};

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post data");
        return res.json();
      })
      .then((data) => {
        console.log("Post created:", data);
        
        setImageUrl("");
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-7xl flex items-center justify-center min-h-screen bg-gradient-to-br from-fuchsia-50 to-fuchsia-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 justify-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-fuchsia-600">
          Upload Image Info
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {imageUrl && (
            <div className="flex justify-center mb-4">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg border border-gray-200 shadow"
              />
            </div>
          )}

          <div className="form-control">
            <label htmlFor="imageUrl" className="label">
              <span className="label-text font-medium">Image URL</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text font-medium">Image Title</span>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter a catchy title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="description" className="label">
              <span className="label-text font-medium">Image Description</span>
            </label>
            <textarea
              id="description"
              placeholder="Describe the image in a few words..."
              className="textarea textarea-bordered w-full h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-fuchsia-500 text-white focus:bg-fuchsia-700 transition shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
