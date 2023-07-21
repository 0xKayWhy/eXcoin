import { Row,Col, Container, Card } from "react-bootstrap";


export function Cards () {
    return (
        <Container>
      <Row>
        <Row className="h2 fw-bold mt-3">Today's Cryptocurrency Prices by Market Cap</Row>
        <Row>The global crypto market cap is $1.22T, a 0.12% increase over the last day.</Row>
        <Col>
        <Card style={{ width: '18rem' }} className="mt-5">
      <Card.Body>
        <div className="d-flex">
        <Card.Title className="me-auto fw-bold">Trending</Card.Title>
        <Card.Link href="#">More</Card.Link>
        </div>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
      </Card.Body>
    </Card>
        </Col>
        <Col>
        <Card style={{ width: '18rem' }} className="mt-5">
      <Card.Body>
        <div className="d-flex">
        <Card.Title className="me-auto fw-bold">Trending</Card.Title>
        <Card.Link href="#">More</Card.Link>
        </div>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
      </Card.Body>
    </Card>
        </Col>
        <Col>
        <Card style={{ width: '18rem' }} className="mt-5">
      <Card.Body>
        <div className="d-flex">
        <Card.Title className="me-auto fw-bold">Fear & Greed Index</Card.Title>
        <Card.Link href="#">More</Card.Link>
        </div>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
      </Card.Body>
    </Card>
        </Col>
      </Row>
      </Container>
    )
}