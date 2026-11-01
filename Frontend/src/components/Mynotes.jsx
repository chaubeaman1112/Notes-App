import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 
const Mynotes = () => {
 
const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const navigate= useNavigate()
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:3000/inputdata",
      {
        title: title,
        description: description
      }
    );
    // alert('Notes Created')
    // console.log( response.data);
  
    setTitle("");
    setDescription("");
    navigate('/mynotes')
  } catch (error) {
    alert("Error occured check your console")
    console.log("Error:", error);
  }
};
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-5 py-10">

    {/* Main Container */}
    <div className="w-full max-w-xl">

      {/* Heading */}
      <div className="text-center mb-8">

        <p className="text-sm font-bold tracking-[0.25em] text-blue-600 uppercase mb-3">
          Your Personal Space
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Create a Note<span className="text-blue-600">.</span>
        </h1>

        <p className="text-slate-500 mt-3">
          Write down your thoughts and keep your ideas organized.
        </p>

      </div>

      {/* Form Card */}
      <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-6 sm:p-9 shadow-xl shadow-slate-200/70">

        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >

          {/* Title Input */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-semibold text-slate-700">
              Note Title
            </label>

            <input
              type="text"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />

          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">

            <label className="text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={6}
              placeholder="Start writing your thoughts here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 outline-none resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98] transition-all duration-300"
          >
            + Create Note
          </button>

        </form>

      </div>

      {/* Footer */}
      <p className="text-center text-sm text-slate-400 mt-6">
        Your thoughts, organized in one place.
      </p>

    </div>

  </div>
  )
}

export default Mynotes