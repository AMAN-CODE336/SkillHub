import { Link } from "react-router-dom";


export default function AdminDashboard() {
  return (
<div className="p-6">
      <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>

      <div className="mt-4 space-y-2">
        <Link to="/admin/manage-courses" className="text-blue-600 underline">
          Manage Courses
        </Link>
      </div>
    </div>  );
}
