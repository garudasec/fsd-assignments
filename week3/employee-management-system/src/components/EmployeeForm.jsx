import { useState } from "react";

function EmployeeForm({ addEmployee }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    married: false,
    photo: null,
    photoPreview: "",
  });

  // Handle all inputs except file input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.age ||
      !formData.address ||
      !formData.department ||
      !formData.salary
    ) {
      alert("Please fill all fields.");
      return;
    }

    const employee = {
      id: Date.now(),
      ...formData,
      salary: Number(formData.salary),
      age: Number(formData.age),
    };

    addEmployee(employee);

    // Reset form
    setFormData({
      name: "",
      age: "",
      address: "",
      department: "",
      salary: "",
      married: false,
      photo: null,
      photoPreview: "",
    });
  };

  return (
    <section className="panel form-panel">
      <div className="panel__header">
        <div>
          <p className="eyebrow">New record</p>
          <h2>Add Employee</h2>
        </div>
        <p className="panel__hint">Fields marked are required to add a record</p>
      </div>

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Asha Verma"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="e.g. 29"
              min="0"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="IT">IT</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="salary">Salary (per annum)</label>
            <div className="input-prefix">
              <span>₹</span>
              <input
                id="salary"
                type="number"
                name="salary"
                placeholder="e.g. 650000"
                min="0"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field field--wide">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Street, city, state"
              rows="2"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="field">
            <label htmlFor="photo">Profile Photo</label>
            <label className="file-drop" htmlFor="photo">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 3a1 1 0 0 1 1 1v9.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Z"
                />
                <path
                  fill="currentColor"
                  d="M5 15a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2a1 1 0 1 1 2 0v2a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1Z"
                />
              </svg>
              <span>{formData.photo ? formData.photo.name : "Upload a photo"}</span>
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input-hidden"
            />
          </div>

          <div className="field field--align-bottom">
            <label className="checkbox">
              <input
                type="checkbox"
                name="married"
                checked={formData.married}
                onChange={handleChange}
              />
              <span>Married</span>
            </label>
          </div>
        </div>

        <div className="form-footer">
          {formData.photoPreview ? (
            <div className="photo-preview">
              <img src={formData.photoPreview} alt="Preview" width="48" height="48" />
              <span>Photo ready</span>
            </div>
          ) : (
            <span className="form-footer__hint">No photo selected</span>
          )}

          <button type="submit" className="btn btn-primary">
            Add Employee
          </button>
        </div>
      </form>
    </section>
  );
}

export default EmployeeForm;
