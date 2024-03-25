import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {GoLinkExternal} from 'react-icons/go'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobItemdetails: {},
    similarJobList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    const {history} = this.props

    if (jwtToken === undefined) {
      history.replace('/')
    } else {
      this.getJobDetails()
    }
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const updatedData = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const fromattedData = data.similar_jobs.map(jobs => ({
        id: jobs.id,
        companyLogoUrl: jobs.company_logo_url,
        employmentType: jobs.employment_type,
        jobDescription: jobs.job_description,
        location: jobs.location,
        rating: jobs.rating,
        title: jobs.title,
      }))

      this.setState({
        jobItemdetails: updatedData,
        similarJobList: fromattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailuerView = () => (
    <>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <Link to="/jobs">
          <button>Retry</button>
        </Link>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {jobItemdetails, similarJobList} = this.state
    const {
      id,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemdetails
    return (
      <div>
        <div className="job-item-card-container">
          <div className="job-item-header-container">
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
              <IoLocationSharp /> {location}
              <FaSuitcase /> {employmentType}
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="job-type-detail-container">
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>
              Visit <GoLinkExternal />{' '}
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skill-container">
            {skills.map(skill => (
              <li className="list-container">
                <img
                  src={skill.image_url}
                  alt={skill.name}
                  className="skils-logo"
                />
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-conatainer">
            <div>
              <h1>Life at Company</h1>
              <p>{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.image_url}
              alt="lifeAtCompany"
              className="company-image"
            />
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul className="similarjob-list-container">
            {similarJobList.map(jobList => (
              <SimilarJobs jobList={jobList} key={jobList.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailedView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailuerView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobItem-detailed-container">
        <Header />
        {this.renderJobDetailedView()}
      </div>
    )
  }
}
export default JobItemDetails
