import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axiosClient.get("/enroll/my-courses");

        // 🔥 FIX: extract course from enrollment
        const enrolledCourses = res.data.map(
          (enroll) => enroll.course
        );

        setCourses(enrolledCourses);
      } catch (err) {
        console.error("Failed to load enrolled courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return <div className="p-6">Loading your courses...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">
          You have not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-4 border rounded-lg shadow bg-white"
            >
              <h2 className="text-xl font-semibold">
                {course.title}
              </h2>

              <p className="text-gray-600 mt-1">
                {course.description}
              </p>

              <p className="mt-2 font-semibold text-blue-600">
                ₹{course.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
