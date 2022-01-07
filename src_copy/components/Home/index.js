import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactFileReader from 'react-file-reader'
import Loader from 'react-loader-spinner'
import PostItem from '../PostItem'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    postData: [],
    uploadData: [],
  }

  componentDidMount() {
    this.getPostData()
    this.getDataFromLocalStorage()
  }

  getDataFromLocalStorage = () => {
    const data = localStorage.getItem('JsonData')
    this.setState({uploadData: data})
  }

  uploadDataToDatabase = async () => {
    const {uploadData} = this.state

    const myToken = Cookies.get('jwt_token')
    const apiUrl = `https://gopal-financepeer-app-demo.herokuapp.com/posts/`
    const options = {
      method: 'POST',
      headers: {
        'access-control-allow-origin': '*',
        Authorization: `Bearer ${myToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
  }

  getPostData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = ` https://gopal-financepeer-app-demo.herokuapp.com/getPosts`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.map(each => ({
        user_id: each.userId,
        id: each.id,
        title: each.title,
        body: each.body,
      }))
      this.setState({
        postData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div>
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <h1 className="error-message">No Posts Found</h1>
    </div>
  )

  renderPostListView = () => {
    const {postData} = this.state
    return (
      <ul>
        {postData.map(each => (
          <PostItem key={each.id} postDetails={each} />
        ))}
      </ul>
    )
  }

  handleFiles = files => {
    const reader = new FileReader()
    reader.onload = function (e) {
      console.log(reader.result)
    }
    reader.readAsText(files[0])
  }

  changeOnUpload = e => {
    this.handleSubmit(e)
  }

  renderPosts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPostListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>
          <ReactFileReader handleFiles={this.handleFiles}>
            <button className="btn" type="button">
              Upload
            </button>
            <button type="submit" onSubmit={this.uploadDataToDatabase}>
              Submit
            </button>
          </ReactFileReader>
        </div>

        <div>{this.renderPosts()}</div>
      </>
    )
  }
}
export default Home
