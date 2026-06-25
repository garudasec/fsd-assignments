import TableItem from "./TableItem";

function Table({ employees, deleteEmployee }) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-9 2.24-9 5v2a1 1 0 0 0 1 1h7.5a1 1 0 1 0 0-2H5v-1c0-1.13 3.13-3 7-3s7 1.87 7 3v1h-1.5a1 1 0 1 0 0 2H20a1 1 0 0 0 1-1v-2c0-2.76-4.58-5-9-5Zm6.5-1a1 1 0 0 1-1-1V9.5h-2.5a1 1 0 1 1 0-2H17.5V5a1 1 0 1 1 2 0v2.5H22a1 1 0 1 1 0 2h-2.5V12a1 1 0 0 1-1 1Z"
          />
        </svg>
        <p>No employees yet</p>
        <span>Add your first team member using the form above.</span>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Married</th>
            <th aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <TableItem
              key={employee.id}
              employee={employee}
              deleteEmployee={deleteEmployee}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
