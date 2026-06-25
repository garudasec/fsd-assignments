function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TableItem({ employee, deleteEmployee }) {
  const deptClass = `badge badge--${employee.department.toLowerCase()}`;

  return (
    <tr>
      <td>
        {employee.photoPreview ? (
          <img
            className="avatar-photo"
            src={employee.photoPreview}
            alt={employee.name}
            width="40"
            height="40"
          />
        ) : (
          <span className="avatar-fallback" aria-hidden="true">
            {getInitials(employee.name)}
          </span>
        )}
      </td>

      <td className="cell-name">{employee.name}</td>

      <td>{employee.age}</td>

      <td className="cell-address">{employee.address}</td>

      <td>
        <span className={deptClass}>{employee.department}</span>
      </td>

      <td className="cell-salary">₹ {employee.salary.toLocaleString("en-IN")}</td>

      <td>
        <span className={`status-dot ${employee.married ? "status-dot--yes" : "status-dot--no"}`}>
          {employee.married ? "Yes" : "No"}
        </span>
      </td>

      <td>
        <button
          type="button"
          className="btn-icon-delete"
          onClick={() => deleteEmployee(employee.id)}
          aria-label={`Delete ${employee.name}`}
          title="Delete employee"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M9 3a1 1 0 0 0-1 1v1H4a1 1 0 1 0 0 2h1v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7h1a1 1 0 1 0 0-2h-4V4a1 1 0 0 0-1-1H9Zm1 2h4v0h-4Zm-1 5a1 1 0 1 1 2 0v7a1 1 0 1 1-2 0v-7Zm5 0a1 1 0 1 1 2 0v7a1 1 0 1 1-2 0v-7Z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default TableItem;
