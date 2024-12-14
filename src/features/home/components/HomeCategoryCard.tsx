import { Card, Button } from "react-bootstrap";

interface HomeCategoryCardProps {
  name: string;
  onClick: () => void;
}

const HomeCategoryCard = ({ name, onClick }: HomeCategoryCardProps) => {
  return (
    <Card className="text-center shadow-sm" style={{ borderRadius: "8px" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="primary" onClick={onClick}>
          View Products
        </Button>
      </Card.Body>
    </Card>
  );
};

export default HomeCategoryCard;
