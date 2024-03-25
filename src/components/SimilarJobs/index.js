import {FaStar, FaSuitcase} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const SimilarJobs = props => {
  const {jobList} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobList

  return (
    <div className="similar-job-container">
      <div className="job-item-header-container">
        <img src={companyLogoUrl} alt={title} className="company-logo" />
        <div>
          <h1>{title}</h1>
          <p>
            <FaStar className="star-icon" /> {rating}
          </p>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="job-location-container">
        <IoLocationSharp /> {location}
        <FaSuitcase /> {employmentType}
      </div>
    </div>
  )
}
export default SimilarJobs
