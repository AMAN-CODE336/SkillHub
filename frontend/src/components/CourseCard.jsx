export default function CourseCard({ course, onEnroll }) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <p className="text-gray-600 mt-2">{course.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-blue-600">₹{course.price}</span>

        <button
          onClick={onEnroll}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Enroll
        </button>
      </div>
    </div>
  );
}
