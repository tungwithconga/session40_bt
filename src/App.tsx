import React, { useState } from 'react';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    dateOfBirth: '',
    email: '',
    address: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [employees, setEmployees] = useState([
    { id: 1, userName: 'Nguyễn Văn A', dateOfBirth: '1990-02-28', email: 'nvana@gmail.com', address: 'Ba Đình, Hà Nội', status: 'active' },
    { id: 2, userName: 'Trần Thị B', dateOfBirth: '1985-07-15', email: 'ttb@gmail.com', address: 'Cầu Giấy, Hà Nội', status: 'inactive' },
    { id: 3, userName: 'Lê Văn C', dateOfBirth: '2000-10-03', email: 'lvc@gmail.com', address: 'Hai Bà Trưng, Hà Nội', status: 'inactive' },
    { id: 4, userName: 'Phạm Thị D', dateOfBirth: '1995-05-20', email: 'ptd@gmail.com', address: 'Hoàn Kiếm, Hà Nội', status: 'active' },
    { id: 5, userName: 'Ngô Văn E', dateOfBirth: '1988-11-12', email: 'nve@gmail.com', address: 'Cầu Giấy, Hà Nội', status: 'active' }
  ]);

  const handleAddNewEmployeeClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      userName: '',
      dateOfBirth: '',
      email: '',
      address: ''
    });
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.userName) {
      errors.userName = 'Họ và tên không được để trống.';
    }
    if (!formData.email) {
      errors.email = 'Email không được để trống.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email không đúng định dạng.';
    }
    if (formData.dateOfBirth) {
      const today = new Date().toISOString().split('T')[0];
      if (formData.dateOfBirth > today) {
        errors.dateOfBirth = 'Ngày sinh không được lớn hơn ngày hiện tại.';
      }
    } else {
      errors.dateOfBirth = 'Ngày sinh không được để trống.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Thêm nhân viên mới vào danh sách
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
        status: 'active'
      };
      setEmployees([...employees, newEmployee]);
      handleCloseForm();
    }
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button className="btn btn-primary" onClick={handleAddNewEmployeeClick}>
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: 350 }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh" />
          </div>
          {/* Danh sách nhân viên */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={2}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.userName}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className={`status ${employee.status === 'active' ? 'status-active' : 'status-stop'}`} />
                      <span>{employee.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
                    </div>
                  </td>
                  <td>
                    <span className="button button-block">{employee.status === 'active' ? 'Chặn' : 'Bỏ chặn'}</span>
                  </td>
                  <td>
                    <span className="button button-edit">Sửa</span>
                  </td>
                  <td>
                    <span className="button button-delete" onClick={() => handleDelete(employee.id)}>Xóa</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
              <option selected="">Hiển thị 10 bản ghi trên trang</option>
              <option>Hiển thị 20 bản ghi trên trang</option>
              <option>Hiển thị 50 bản ghi trên trang</option>
              <option>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </footer>
        </main>
      </div>
      {/* Form thêm mới nhân viên */}
      {showForm && (
        <div className="overlay">
          <form className="form" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center">
              <h4>Chỉnh sửa nhân viên</h4>
              <i className="fa-solid fa-xmark" onClick={handleCloseForm} />
            </div>
            <div>
              <label className="form-label" htmlFor="userName">
                Họ và tên
              </label>
              <input
                id="userName"
                type="text"
                className="form-control"
                value={formData.userName}
                onChange={handleChange}
              />
              {formErrors.userName && <div className="form-text error">{formErrors.userName}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="dateOfBirth">
                Ngày sinh
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="form-control"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {formErrors.dateOfBirth && <div className="form-text error">{formErrors.dateOfBirth}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <div className="form-text error">{formErrors.email}</div>}
            </div>
            <div>
              <label className="form-label" htmlFor="address">
                Địa chỉ
              </label>
              <textarea
                className="form-control"
                id="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="w-100 btn btn-primary">Thêm mới</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
