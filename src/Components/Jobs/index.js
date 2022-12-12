/* eslint-disable prettier/prettier */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobDetails from '../JobDetails'
import './index.css'

const apiStatusConstant = {
  initiAl: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    urlStatus: apiStatusConstant.initiAl,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileApiUrl()
  }

  renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="ThreeDots" height="50" width="50" color="white" />
    </div>
  )

  renderSuccessProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <>
        <div className="sm-search-container">
          <input type="search" placeholder="Search" className="search-input" />
          <button type="button" className="search-btn-icon">
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="profile-jobs-flex-container">
          <div className="profile-container">
            <img
              src={profileImageUrl}
              alt="profile"
              className="profile-avatar"
            />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-description">{shortBio}</p>
          </div>
          <div className="job-details-container">
            <div className="lg-search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
              />
              <button type="button" className="search-btn-icon">
                <BsSearch className="search-icon" />
              </button>
            </div>
            <JobDetails />
          </div>
        </div>
      </>
    )
  }

  onRetry = () => {
    this.getProfileApiUrl()
  }

  renderFailureProfileView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onRetry}
      >
        Retry
      </button>
    </div>
  )

  getProfileApiUrl = async () => {
    this.setState({urlStatus: apiStatusConstant.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Barear ${token}`,
      },
    }
    const responseUrl = await fetch(profileApiUrl, options)
    if (responseUrl.ok === true) {
      const responseData = await responseUrl.json()
      //   console.log(responseData)
      const data = responseData.profile_details
      const updatedData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      //   console.log(updatedData)
      this.setState({
        profileDetails: updatedData,
        urlStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({urlStatus: apiStatusConstant.failure})
    }
  }

  switchCondition = () => {
    const {urlStatus} = this.state
    let result = null
    switch (urlStatus) {
      case apiStatusConstant.success:
        result = this.renderSuccessProfileView()
        break
      case apiStatusConstant.failure:
        result = this.renderFailureProfileView()
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
      <div className="jobs-route">
        <Header />
        {this.switchCondition()}
      </div>
    )
  }
}

export default Jobs
