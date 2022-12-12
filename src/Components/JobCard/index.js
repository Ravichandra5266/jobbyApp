/* eslint-disable prettier/prettier */
import {AiFillStar} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  return (
    <li className="list-job-container">
      <div className="job-head-container">
        <img
          src={companyLogoUrl}
          alt=" job details company logo"
          className="company-avatar"
        />
        <div className="job-description-container">
          <h1 className="job-title">{title}</h1>
          <div className="job-rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="flex-container">
        <div className="flex-container">
          <div className="location-container">
            <GrLocation className="icon" />
            <p className="location">{location}</p>
          </div>
          <div className="employment-container">
            <BsFillBriefcaseFill className="icon" />
            <p className="job-type">{employmentType}</p>
          </div>
        </div>
        <div className="job-salary-container">
          <p className="salary">{packagePerAnnum}</p>
        </div>
      </div>
      <hr className="line" />
      <div>
        <h1 className="description-title">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobCard
