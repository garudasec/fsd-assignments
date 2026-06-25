import { useState } from "react";
import "./App.css";

import EmployeeForm from "./components/EmployeeForm";
import FilterSort from "./components/FilterSort";
import Table from "./components/Table";

const DEPARTMENTS = ["HR", "Finance", "Marketing", "IT"];

function App() {
  const [employees, setEmployees] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [theme, setTheme] = useState("light");

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  // Add Employee
  const addEmployee = (employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  // Delete Employee
  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  // Filter + Sort
  const filteredEmployees = [...employees]
    .filter((employee) => {
      if (departmentFilter === "All") {
        return true;
      }

      return employee.department === departmentFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.salary - b.salary;
      }

      if (sortOrder === "desc") {
        return b.salary - a.salary;
      }

      return 0;
    });

  // Live Stats
  const departmentCounts = DEPARTMENTS.reduce((acc, dept) => {
    acc[dept] = employees.filter(
      (e) => e.department === dept
    ).length;

    return acc;
  }, {});

  const avgSalary =
    employees.length > 0
      ? Math.round(
          employees.reduce((sum, e) => sum + e.salary, 0) /
            employees.length
        )
      : 0;

  const marriedCount = employees.filter(
    (e) => e.married
  ).length;

  return (
    <div className={`layout ${theme}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__mark">EM</span>

          <div>
            <p className="sidebar__name">Ledger HR</p>
            <p className="sidebar__tagline">
              Employee Records
            </p>
          </div>
        </div>

        <nav className="sidebar__nav">
          <span className="sidebar__nav-item sidebar__nav-item--active">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path
                fill="currentColor"
                d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v12h14V6H5Zm2 2h6v2H7V8Zm0 4h10v2H7v-2Zm0 4h10v2H7v-2Z"
              />
            </svg>

            Directory
          </span>
        </nav>

        <div className="sidebar__legend">
          <p className="eyebrow">Departments</p>

          {DEPARTMENTS.map((dept) => (
            <div
              className="legend-row"
              key={dept}
            >
              <span
                className={`legend-dot legend-dot--${dept.toLowerCase()}`}
              ></span>

              <span className="legend-row__label">
                {dept}
              </span>

              <span className="legend-row__count">
                {departmentCounts[dept]}
              </span>
            </div>
          ))}
        </div>

        <div className="sidebar__footer">
          <p>Ledger HR · v1.0</p>
        </div>
      </aside>

      {/* Main */}
      <div className="main">

        <header className="topbar">
          <div>
            <p className="eyebrow">Overview</p>
            <h1>Employee Directory</h1>
          </div>

          <button
            className="theme-btn"
            onClick={toggleTheme}
          >
            {theme === "light"
              ? "🌙 Dark Mode"
              : "☀️ Light Mode"}
          </button>
        </header>

        {/* Stats */}
        <section className="stat-row">
          <div className="stat-card">
            <p className="stat-card__label">
              Total Employees
            </p>

            <p className="stat-card__value">
              {employees.length}
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-card__label">
              Departments Active
            </p>

            <p className="stat-card__value">
              {
                DEPARTMENTS.filter(
                  (d) => departmentCounts[d] > 0
                ).length
              }

              <span className="stat-card__value-suffix">
                {" "}
                / {DEPARTMENTS.length}
              </span>
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-card__label">
              Average Salary
            </p>

            <p className="stat-card__value stat-card__value--mono">
              ₹{avgSalary.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-card__label">
              Married
            </p>

            <p className="stat-card__value">
              {marriedCount}
            </p>
          </div>
        </section>

        {/* Content */}
        <main className="container">
          <EmployeeForm addEmployee={addEmployee} />

          <section className="panel">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Records</p>
                <h2>Team Directory</h2>
              </div>

              <FilterSort
                departmentFilter={departmentFilter}
                setDepartmentFilter={setDepartmentFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>

            <Table
              employees={filteredEmployees}
              deleteEmployee={deleteEmployee}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;