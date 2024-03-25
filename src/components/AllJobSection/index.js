import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import FilterGroups from '../FilterGroups'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobSection extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmploymentType: '',
    activeSalaryRange: '',
    searchInput: '',
    profileDetails: {},
    profileApistatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJoblists()
    this.getProfile()
  }

  getJoblists = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeEmploymentType, activeSalaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok) {
      const updatedData = fetchedData.jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
      }))
      console.log(updatedData[0].title)
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeEmploymentType = id => {
    this.setState({activeEmploymentType: id}, this.getJoblists)
  }

  changeSalaryRange = id => {
    this.setState({activeSalaryRange: id}, this.getJoblists)
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJoblists()
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button>Retry</button>
    </div>
  )

  renderJobListView = () => {
    const {jobList, searchInput} = this.state
    const shouldShowProductsList = jobList.length > 0

    return shouldShowProductsList ? (
      <div>
        <div className="input-contianer">
          <input
            value={searchInput}
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={this.changeSearchInput}
            onKeyDown={this.enterSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul>
          {jobList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getProfile = async () => {
    this.setState({profileApistatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = 'https://apis.ccbp.in/profile'
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profileData,
        profileApistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApistatus: apiStatusConstants.failure})
    }
  }

  renderProfileFailureView = () => (
    <div>
      <button type="button">Retry</button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    return (
      <div>
        <img src={profileDetails.profileImageUrl} alt={profileDetails.name} />
        <h1 className="profile-name">{profileDetails.name}</h1>
        <p className="profile-role">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderProfileLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {profileApistatus} = this.state

    switch (profileApistatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentType, activeSalaryRange} = this.state
    return (
      <div className="all-jobs-Container">
        <FilterGroups
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          renderProfile={this.renderProfile()}
          activeEmploymentType={activeEmploymentType}
          activeSalaryRange={activeSalaryRange}
          changeEmploymentType={this.changeEmploymentType}
          changeSalaryRange={this.changeSalaryRange}
        />
        <div>{this.renderAllJobs()}</div>
      </div>
    )
  }
}

export default AllJobSection
