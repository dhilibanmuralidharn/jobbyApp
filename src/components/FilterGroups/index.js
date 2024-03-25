import './index.css'

const FilterGroups = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    renderProfile,
    changeEmploymentType,
    activeEmploymentType,
    activeSalaryRange,
    changeSalaryRange,
  } = props

  const handleSalaryRange = event => {
    changeSalaryRange(event.target.id)
  }

  const handleEmploymentType = event => {
    changeEmploymentType(event.target.id)
  }
  return (
    <div className="filter-group-container">
      <div className="profile-container">{renderProfile}</div>
      <hr />
      <ul className="list-job-contianer">
        <h1>Type of Employment</h1>
        {employmentTypesList.map(employment => (
          <li key={employment.id}>
            <input
              type="checkbox"
              id={employment.id}
              onChange={handleEmploymentType}
            />
            <label htmlFor={employment.id}>{employment.label}</label>
          </li>
        ))}
      </ul>
      <hr />
      <ul className="list-job-contianer">
        <h1>Salary Range</h1>
        {salaryRangesList.map(salaryRange => (
          <li key={salaryRange.id}>
            <label htmlFor={salaryRange.id}>
              <input
                type="radio"
                id={salaryRange.id}
                value={salaryRange.label}
                name="salary"
                onChange={handleSalaryRange}
              />{' '}
              {salaryRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FilterGroups
