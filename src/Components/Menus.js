import React from 'react'
import { Col, Card } from 'react-bootstrap'

const Menus = ({menu}) => {
  return (
    <Col>
    <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default Menus
