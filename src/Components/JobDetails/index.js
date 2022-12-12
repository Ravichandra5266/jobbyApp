import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobDetails extends Component {
  state = {
    urlStatus: apiStatusConstant.initial,
    jobDetails: [],
  }

  componentDidMount() {
    this.getJobsApiUrl()
  }

  getJobsApiUrl = async () => {
    this.setState({urlStatus: apiStatusConstant.inProgress})
    const jobsApiUrl = 'https://apis.ccbp.in/jobs'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(jobsApiUrl, options)
    // console.log(responseUrl)
    if (responseUrl.ok === true) {
      const responseData = await responseUrl.json()
      //   console.log(responseData)
      const updatedData = responseData.jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        jobDescription: each.job_description,
        employmentType: each.employment_type,
      }))
      //   console.log(updatedData)
      this.setState({
        jobDetails: updatedData,
        urlStatus: apiStatusConstant.success,
      })
    }
  }

  renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="ThreeDots" height="50" width="50" color="white" />
    </div>
  )

  renderSuccessJobDetails = () => {
    const {jobDetails} = this.state
    return (
      <ul className="job-list-container">
        {jobDetails.map(eachJob => (
          <JobCard eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  switchCondition = () => {
    const {urlStatus} = this.state
    let result = null
    switch (urlStatus) {
      case apiStatusConstant.success:
        result = this.renderSuccessJobDetails()
        break
      case apiStatusConstant.failure:
        result = this.renderFailureJobDetails()
        break
      case apiStatusConstant.inProgress:
        result = this.renderSpinner()
        break
      default:
        result = null
        break
    }
    return result
  }

  render() {
    return (
      <div className="jobs-details-container">{this.switchCondition()}</div>
    )
  }
}

export default JobDetails
