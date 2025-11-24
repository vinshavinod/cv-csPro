import { useState } from "react";
import API from "../api";
import "./StudentForm.css";
import logo from "../assets/lg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentForms() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [cv, setCv] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cv) return toast.error("Please upload your CV");
    if (!photo) return toast.error("Please upload your Photo");

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    data.append("cv", cv);
    data.append("photo", photo);

    try {
      await API.post("/internsdetails/create/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Student details uploaded successfully!");

      setFormData({ name: "", email: "", phone: "", course: "" });
      setCv(null);
      setPhoto(null);

      document.getElementById("cvInput").value = "";
      document.getElementById("photoInput").value = "";
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload data");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="page-wrapper">
        {/* Left side */}
        <div className="left-side">
          <img src={logo} alt="Internship" className="left-img" />
          <h2>Welcome to Student Registration Portal</h2>
          <p>Register yourself to access internships and courses.</p>
        </div>

        {/* Right side form */}
        <div className="right-side">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <label>Select Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose a Course --</option>
                <option value="Python Full Stack">Python Full Stack</option>
                <option value="MERN Stack">MERN Stack</option>
                <option value="Flutter Development">Flutter Development</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>

              <label>Upload CV (PDF)</label>
              <input
                id="cvInput"
                type="file"
                accept="application/pdf"
                onChange={(e) => setCv(e.target.files[0])}
                required
              />

              <label>Upload Photo</label>
              <input
                id="photoInput"
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentForms;
