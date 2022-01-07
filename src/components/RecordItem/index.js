import './index.css'

const RecordItem = props => {
  const {item} = props
  const {title, body} = item
  return (
    <li className="record-item">
      <h1 className="title-text">{title}</h1>
      <p className="body-text">{body}</p>
    </li>
  )
}

export default RecordItem
