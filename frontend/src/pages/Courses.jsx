import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import useAuth from "../store/authStore";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useAuth((state) => state.user);
  const navigate = useNavigate();

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosClient.get("/course/");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) {
      return navigate("/login");
    }

    try {
      const res = await axiosClient.post(`/courses/enroll/${courseId}`);
      alert("Enrolled successfully!");
      navigate("/my-courses");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  if (loading) return <p className="p-6">Loading courses...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          onEnroll={() => handleEnroll(course._id)}
        />
      ))}
    </div>
  );
}
