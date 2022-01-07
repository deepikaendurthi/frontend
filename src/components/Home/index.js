import './index.css'

import Header from '../Header'

import {Component} from 'react'
import Cookies from 'js-cookie'

class Home extends Component {
  state = {
    selectedFile: null,
    showErrorMessage: false,
    showSuccessMessage: false,
  }

  onFileChange = event => {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  onFileUpload = () => {
    const {selectedFile} = this.state
    if (selectedFile.type !== 'application/json') {
      this.setState({
        showErrorMessage: true,
        showSuccessMessage: false,
      })
    } else {
      this.setState({
        showErrorMessage: false,
        showSuccessMessage: true,
      })
      const reader = new FileReader()
      reader.readAsText(selectedFile)
      reader.onload = e => {
        const content = e.target.result
        const jwtToken = Cookies.get('jwt_token')
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: content,
        }
        // console.log(content)
        fetch('http://localhost:3000/records', options)
      }
    }
  }

  render() {
    const {showErrorMessage, showSuccessMessage} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="user-input-container">
            <label htmlFor="file-input">Select file</label>
            <input
              type="file"
              className="input-file"
              id="file-input"
              onChange={this.onFileChange}
            />
            <br />
            <button
              type="button"
              className="submit-button"
              onClick={this.onFileUpload}
            >
              Submit
            </button>
            {showErrorMessage && (
              <p className="error-text">Please choose the json file</p>
            )}
            {showSuccessMessage && (
              <p className="success-text">Sumitted Successfully</p>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Home
