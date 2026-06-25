const DEPARTMENTS = ["All", "HR", "Finance", "Marketing", "IT"];

function FilterSort({
  departmentFilter,
  setDepartmentFilter,
  sortOrder,
  setSortOrder,
}) {
  const toggleSort = (order) => {
    setSortOrder(sortOrder === order ? "" : order);
  };

  return (
    <div className="filter-sort">
      <div className="pill-group" role="group" aria-label="Filter by department">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            type="button"
            className={`pill ${departmentFilter === dept ? "pill--active" : ""}`}
            onClick={() => setDepartmentFilter(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="sort-toggle" role="group" aria-label="Sort by salary">
        <button
          type="button"
          className={`icon-toggle ${sortOrder === "asc" ? "icon-toggle--active" : ""}`}
          onClick={() => toggleSort("asc")}
          title="Sort salary low to high"
          aria-pressed={sortOrder === "asc"}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path fill="currentColor" d="M12 4a1 1 0 0 1 1 1v11.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V5a1 1 0 0 1 1-1Z" />
          </svg>
          Low → High
        </button>
        <button
          type="button"
          className={`icon-toggle ${sortOrder === "desc" ? "icon-toggle--active" : ""}`}
          onClick={() => toggleSort("desc")}
          title="Sort salary high to low"
          aria-pressed={sortOrder === "desc"}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path fill="currentColor" d="M12 20a1 1 0 0 1-1-1V7.41l-2.3 2.3a1 1 0 1 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L13 7.41V19a1 1 0 0 1-1 1Z" />
          </svg>
          High → Low
        </button>
      </div>
    </div>
  );
}

export default FilterSort;
