
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Allnotes = () => {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://notes-app-m96c.onrender.com//getnotes")
      .then((res) => {
        setNotes(res.data.Datas);
      })
      .catch((error) => {
        console.log("Fetch Error:", error);
      });
  }, []);

  function deletecard(id) {
    axios
      .delete(`https://notes-app-m96c.onrender.com/${id}`)
      .then(() => {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== id)
        );
      })
      .catch((error) => {
        console.log("Delete Error:", error);
      });
  }

  function startEditing(note) {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditDescription(note.description);
  }

  async function saveUpdate(id) {
    if (!editTitle.trim() || !editDescription.trim()) {
      alert("Please fill both fields");
      return;
    }

    try {
      setLoading(true);

      await axios.patch(`https://notes-app-m96c.onrender.com//${id}`, {
        title: editTitle,
        description: editDescription,
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id
            ? {
                ...note,
                title: editTitle,
                description: editDescription,
              }
            : note
        )
      );

      setEditId(null);
      setEditTitle("");
      setEditDescription("");
    } catch (error) {
      console.log("Update Error:", error);
      alert("Unable to update note");
    } finally {
      setLoading(false);
    }
  }

  function cancelEditing() {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 px-5 py-10 md:px-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              My Notes<span className="text-blue-600">.</span>
            </h1>
            <p className="text-slate-500 mt-2">
              Manage your thoughts and ideas in one place.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg"
          >
            <span className="text-xl mr-2">+</span>
            Add Notes
          </button>
        </div>

        <div className="mb-6">
          <p className="text-slate-600 font-medium">
            Total Notes:{" "}
            <span className="text-blue-600 font-bold">
              {notes.length}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white/90 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 flex flex-col min-h-[260px]"
            >
              <div className="mb-5">
                <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                  My Note
                </span>
              </div>

              {editId === note._id ? (
                <div className="flex-1 flex flex-col gap-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Enter note title"
                    className="w-full p-3 bg-slate-50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-slate-800 font-semibold"
                  />

                  <textarea
                    rows={5}
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(e.target.value)
                    }
                    placeholder="Enter note description"
                    className="w-full p-3 bg-slate-50 border border-blue-200 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-100 text-slate-600"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-3 break-words">
                    {note.title}
                  </h2>

                  <p className="text-sm text-slate-500 leading-7 whitespace-pre-wrap break-words">
                    {note.description}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 mt-6">
                {editId === note._id ? (
                  <>
                    <button
                      onClick={cancelEditing}
                      disabled={loading}
                      className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => saveUpdate(note._id)}
                      disabled={loading}
                      className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(note)}
                      disabled={editId !== null}
                      className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all disabled:opacity-50"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deletecard(note._id)}
                      disabled={editId !== null}
                      className="px-4 py-2 text-sm font-semibold text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-all disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-700">
              No Notes Found
            </h2>
            <p className="text-slate-500 mt-2">
              Start by creating your first note.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Allnotes;
