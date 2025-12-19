import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axiosSecure
      .get("/applications", { params: { email: user.email } }) // ✅ email must match JWT
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this application?")) return;

  try {
    const res = await axiosSecure.delete(`/applications/${id}`);
    if (res.data.deletedCount > 0) {
      alert("Application deleted successfully!");
      setApplications(prev => prev.filter(app => app._id !== id));
    }
  } catch (error) {
    alert(error.response?.data?.message || "Failed to delete");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>

      <table className="table">
        <thead>
          <tr>
            <th>University</th>
            <th>Subject</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.universityName}</td>
              <td>{app.subjectCategory}</td>
              <td>${app.applicationFees}</td>

              <td>{app.applicationStatus}</td>
              <td>{app.paymentStatus}</td>

              <td>
                {app.applicationStatus === "pending" && (
                  <>
                    <button className="btn btn-xs btn-success mr-3">Pay</button>
                    <button  onClick={() => handleDelete(app._id)} className="btn btn-xs btn-error">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
