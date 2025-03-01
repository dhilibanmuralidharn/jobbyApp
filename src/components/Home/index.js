import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content-container">
        <h1 className="home-heeader">Find the Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of People are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="findJobs-button">
            Finds Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
