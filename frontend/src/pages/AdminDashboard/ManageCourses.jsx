import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: ""
  });

  const [loading, setLoading] = useState(false);

  // Fetch all courses
  const loadCourses = async () => {
    try {
      const res = await axiosClient.get("/course/");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load courses");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Create course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axiosClient.post("/course/", form);

      alert("Course created!");
      setForm({ title: "", description: "", price: "" });
      loadCourses();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>

      {/* COURSE CREATION FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-white p-4 rounded shadow mb-10">

        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Course Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

      </form>

      {/* COURSE LIST */}
      <h2 className="text-2xl font-semibold mb-4">Existing Courses</h2>

      <div className="space-y-4">
        {courses.map((c) => (
          <div key={c._id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="text-gray-600">{c.description}</p>
            <p className="font-bold mt-1 text-blue-600">₹{c.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
