import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const resultStatus = {
  success: 'success',
  failure: 'failure',
}

const loader = (
  <div data-testid="loader">
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  </div>
)

class CourseItemDetails extends Component {
  state = {status: '', isLoading: true, courseData: []}

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getCourseItemDetails(id)
  }

  onSuccessApiCall = courseDetails => {
    const updatedData = {
      id: courseDetails.id,
      name: courseDetails.name,
      imageUrl: courseDetails.image_url,
      description: courseDetails.description,
    }
    console.log('data')
    this.setState({
      isLoading: false,
      status: 'success',
      courseData: updatedData,
    })
  }

  onFailureApiCall = () => this.setState({isLoading: false, status: 'failure'})

  getCourseItemDetails = async id => {
    const courseItemDetailsApi = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(courseItemDetailsApi)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessApiCall(data.course_details)
    } else {
      this.onFailureApiCall()
    }
  }

  renderSuccessView = () => {
    const {courseData} = this.state
    const {imageUrl, description, name} = courseData
    const successView = (
      <div className="course-details">
        <img src={imageUrl} alt={name} className="course-img" />
        <div className="info-container">
          <h1 className="course-title">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )

    return successView
  }

  apiFunction = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getCourseItemDetails(id)
  }

  renderFailureView = () => <FailureView apiFunction={this.apiFunction} />

  renderDisplayContent = () => {
    const {status} = this.state

    switch (status) {
      case resultStatus.success:
        return this.renderSuccessView()
      case resultStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    const courseCard = (
      <div className="course-details-container">
        <Header />
        {isLoading === true ? loader : this.renderDisplayContent()}
      </div>
    )

    return courseCard
  }
}

export default CourseItemDetails
