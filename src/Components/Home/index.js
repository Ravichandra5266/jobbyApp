/* eslint-disable prettier/prettier */
import Header from '../Header'
import './index.css'

const Home = props => {
  const onJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-route">
        <h1 className="home-title">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits your ability and potential.
        </p>
        <button type="button" className="home-nav-to-jobs-btn" onClick={onJobs}>
          Find Jobs
        </button>
      </div>
    </>
  )
}

export default Home
