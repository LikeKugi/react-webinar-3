import Heading from "../heading/heading";
import PropTypes from "prop-types";
import './style.css'

function ProfileCard(props) {
  return (
    <div className="ProfileCard">
      <Heading text={props.heading} variant="h2" />
      <p>{props.name}</p>
      <p>{props.phone}</p>
      <p>{props.email}</p>
    </div>
  )
}

ProfileCard.propTypes = {
  heading: PropTypes.string,
  name: PropTypes.node,
  phone: PropTypes.node,
  email: PropTypes.node,
}

export default ProfileCard
