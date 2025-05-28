
import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Failed to fetch users:", err));

    fetch("http://localhost:3000/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Failed to fetch posts:", err));
  }, []);

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description);
    setEditImageUrl(post.imageUrl);
  };

  const saveEdit = () => {
    fetch(`http://localhost:3000/posts/${editingPostId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        imageUrl: editImageUrl
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update post");
      return res.json();
    })
    .then(updatedPost => {
      setPosts(posts.map(p => p.id === editingPostId ? updatedPost : p));
      setEditingPostId(null);
    })
    .catch(err => alert(err.message));
  };

  const deletePost = (postId) => {
    if (!window.confirm("confirm delete that post?")) return;

    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE"
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete post");
      setPosts(posts.filter(p => p.id !== postId));
    })
    .catch(err => alert(err.message));
  };

  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 p-10 ">
      {posts.map((post) => {
        const postOwner = getUserName(post.userId);

        return (
          <div key={post.id} className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
            </figure>
            <div className="card-body">
              {editingPostId === post.id ? (
                <>
                  <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    value={editImageUrl}
                    onChange={e => setEditImageUrl(e.target.value)}
                  />
                  <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="textarea textarea-bordered w-full mb-2"
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                  />
                  <div className="card-actions justify-end gap-3">
                    <button
                      onClick={saveEdit}
                      className="btn btn-sm btn-success"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPostId(null)}
                      className="btn btn-sm btn-warning"
                    >
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="card-title flex justify-between items-center text-fuchsia-900">
  {post.title}
  <div className="badge badge-secondary text-xs py-1 px-2">
    uploaded by: {postOwner}
  </div>
</h2>
                  <p>{post.description}</p>
                  <div className="card-actions justify-end gap-3 mt-4">
                    {(loggedInUser && loggedInUser.id === post.userId) && (
                      <>
                        <button
                          className="btn btn-sm btn-ghost text-lime-600 hover:bg-lime-100"
                          onClick={() => startEditing(post)}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100"
                          onClick={() => deletePost(post.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
