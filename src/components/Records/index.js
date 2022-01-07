import Header from '../Header'

import RecordItem from '../RecordItem'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const records = [
  {
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    id: 2,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    id: 3,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    id: 4,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Records extends Component {
  state = {
    apiStatus: apiStatusConstants.success,
    ListOfRecordItems: [],
  }

  componentDidMount() {
    this.getRecordsList()
  }

  getRecordsList = async () => {
    // this.setState({
    //     apiStatus: apiStatusConstants.inProgress,
    // })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'http://localhost:3000/records'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({
        ListOfRecordItems: records,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRecordItems = () => {
    // const {ListOfRecordItems} = this.state
    return (
      <>
        <Header />
        <div className="records-container">
          <h1>List of Records</h1>
          <ul className="record-items-container">
            {records.map(eachItem => (
              <RecordItem key={eachItem.id} item={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="records-container">
        <h1>List of Records</h1>
        <div className="failure-container">
          <p className="text">Sorry, no records found</p>
        </div>
      </div>
    </>
  )

  renderLoading = () => (
    <div className="records-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRecords = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRecordItems()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderRecords()
  }
}

export default Records
