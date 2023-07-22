import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'
import FailureView from '../FailureView'

import './index.css'

const coursesApiUrl = 'https://apis.ccbp.in/te/courses'

const loader = (
  <div data-testid="loader">
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  </div>
)

const statusConst = {
  success: 'success',
  failure: 'failure',
}

class CourseDetails extends Component {
  state = {isLoading: true, courses: [], status: ''}

  componentDidMount() {
    this.getCoursesDetails()
  }

  onSuccessApiCall = courses => {
    const updatedCourses = courses.map(eachCourse => ({
      id: eachCourse.id,
      logoUrl: eachCourse.logo_url,
      name: eachCourse.name,
    }))
    this.setState({
      isLoading: false,
      courses: updatedCourses,
      status: 'success',
    })
  }

  onFailureApiCall = () => {
    this.setState({isLoading: false, status: 'failure'})
  }

  renderSuccessView = () => {
    const {courses} = this.state
    const successView = (
      <ul className="courses-list-container">
        {courses.map(eachCourse => (
          <CourseItem key={eachCourse.id} course={eachCourse} />
        ))}
      </ul>
    )
    return successView
  }

  renderFailureView = () => <FailureView apiFunction={this.getCoursesDetails} />

  getCoursesDetails = async () => {
    const response = await fetch(coursesApiUrl)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccessApiCall(data.courses)
    } else {
      this.onFailureApiCall()
    }
  }

  renderCoursesDetails = () => {
    const {status} = this.state
    switch (status) {
      case statusConst.success:
        return this.renderSuccessView()
      case statusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    const app = (
      <>
        <Header />
        <div className="main-container">
          <h1 className="courses-title">Courses</h1>
          {isLoading ? loader : this.renderCoursesDetails()}
        </div>
      </>
    )
    return app
  }
}

export default CourseDetails
