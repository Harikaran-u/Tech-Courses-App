import {Link} from 'react-router-dom'

import './index.css'

const Card = props => {
  const {course} = props
  const {logoUrl, name, id} = course
  const card = (
    <Link to={`/courses/${id}`} className="link-style">
      <li className="courses-card">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
  return card
}

export default Card
