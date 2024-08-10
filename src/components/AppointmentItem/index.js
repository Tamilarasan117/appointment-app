import './index.css'

const AppointmentItem = (props) => {
  const {
    appointmentsList,
    onFavoriteAppointment,
  } = props
  const {
    id,
    appointmentTitle,
    appointmentDate,
    isFavorite
  } = appointmentsList

  const onLike = () => {
    onFavoriteAppointment(id)
  }

  const star = isFavorite
    ?
      'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    :
      'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <>
      <li className="appointment-item">
        <div className="heading-container">
          <p className="title-text">{appointmentTitle}</p>
          <button
            type="button"
            className="star-button"
            onClick={onLike}
            data-testid="star"
          >
            <img
              src={star}
              alt="star"
              className="start"
            />
          </button>
        </div>
        <p className="date-text">Date: {appointmentDate}</p>
      </li>
    </>
  )
}

export default AppointmentItem
