import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import useAuth from "../store/authStore";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import { openRazorpayCheckout } from "../utils/razorpay";

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

  const handleEnroll = async (course) => {
  if (!user) {
    navigate("/login");
    return;
  }

  // FREE COURSE
  if (Number(course.price) === 0) {
    try {
      await axiosClient.post(`/courses/enroll/${course._id}`);
      alert("Enrolled successfully!");
      navigate("/my-courses");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    }
    return;
  }

  // PAID COURSE
  try {
    const res = await axiosClient.post("/payment/create-order", {
      amount: Number(course.price) * 100
    });

    const { order } = res.data;

await openRazorpayCheckout({
  orderId: order.id,
  amount: order.amount,
  currency: order.currency,
  user,
  courseId: course._id,
    onSuccess: () => navigate("/my-courses")

});


  } catch (err) {
    console.error(err);
    alert("Failed to start payment");
  }
};


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          onEnroll={() => handleEnroll(course)}
        />
      ))}
    </div>
  );
}
