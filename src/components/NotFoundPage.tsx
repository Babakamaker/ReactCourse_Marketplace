import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container className="text-center" style={{ marginTop: '100px' }}>
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <p className="lead">Page Not Found</p>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Go Back to Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
