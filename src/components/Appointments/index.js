import './index.css'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'
import {v4 as uuidv4} from 'uuid'
import {eachDayOfInterval, format} from 'date-fns'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isActive: false,
  }

  onFavoriteAppointment = (id) => {
    this.setState(beforeState => ({
      appointmentsList: beforeState.appointmentsList.map(eachAppointment => {
        if(id === eachAppointment.id) {
          return {...eachAppointment,isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      })
    }))
  }

  onFilterAppointment = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }

  onChangeTitle = (event) => {
    this.setState({title: event.target.value})
  }

  onChangeDate = (event) => {
    this.setState({date: event.target.value})
  }

  onSubmitAppointment = (event) => {
    event.preventDefault()
    const {title,date} = this.state
    const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointments = {
      id: uuidv4(),
      appointmentTitle: title,
      appointmentDate: formatedDate,
      isFavorite: false,
    }
    this.setState(beforeState => ({
      appointmentsList: [...beforeState.appointmentsList,newAppointments],
      title: '',
      date: '',
    }))
  } 

  renderNewAppointments = () => {
    const {appointmentsList,isActive} = this.state
    if(isActive) {
      return appointmentsList.filter(eachAppointment => eachAppointment.isFavorite === true)
    }
    return appointmentsList
  }

  render() {
    const {title,date,isActive} = this.state
    const filtredAppointments = this.renderNewAppointments()
    const stared = isActive ? 'select-appointment-button' : ''
    return (
      <>
        <div className="app-container">
          <div className="container">
            <div className="appointment-container">
              <form className="appointment-form" onSubmit={this.onSubmitAppointment}>
                <h1 className="main-heading">Add Appointment</h1>
                <div className="input-box">
                  <label htmlFor="title" className="title-label">title</label>
                  <input
                    type="text"
                    id="title"
                    placeholder='Title'
                    className="input"
                    onChange={this.onChangeTitle}
                    value={title}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="date" className="title-label">date</label>
                  <input
                    type="date"
                    id="date"
                    placeholder='dd/mm/yyyy'
                    className="input"
                    onChange={this.onChangeDate}
                    value={date}
                  />
                </div>
                <button
                  type="submit"
                  className="button"
                >
                  Add
                </button>
              </form>
              <div className="img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="img"
                />
              </div>
            </div>
            <hr className="line" />
            <div className="appointments-container">
              <div className="head-card">
                <h1 className="appointments-heading">Appointments</h1>
                <button
                  type="button"
                  className={`starred-button ${stared}`}
                  onClick={this.onFilterAppointment}
                >
                  Starred
                </button>
              </div>
              <ul className="appointments-lists">
                {
                  filtredAppointments.map(eachAppointment => (
                    <AppointmentItem
                      appointmentsList={eachAppointment}
                      key={eachAppointment.id}
                      onFavoriteAppointment={this.onFavoriteAppointment}
                    />
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Appointments 
