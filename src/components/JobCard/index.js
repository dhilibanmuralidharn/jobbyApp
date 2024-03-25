import {Link} from 'react-router-dom'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobData

  return (
    <div className="job-card-container">
      <Link to={`/jobs/${id}`}>
        <div className="job-card-header-container">
          <img src={companyLogoUrl} alt={title} className="company-logo" />
          <div>
            <h1>{title}</h1>
            <p>
              <FaStar className="star-icon" /> {rating}
            </p>
          </div>
        </div>
        <div className="job-type-detail-container">
          <div className="job-location-container">
            <p>
              <IoLocationSharp /> {location}
            </p>
            <p>
              <FaSuitcase /> {employmentType}
            </p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <p>Description</p>
        <p>{jobDescription}</p>
      </Link>
    </div>
  )
}

export default JobCard
