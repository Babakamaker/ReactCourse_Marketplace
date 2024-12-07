interface HomeCategoryCardProps {
  name: string;
  onClick: () => void;
}

const HomeCategoryCard = ({ name, onClick }: HomeCategoryCardProps) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h3>{name}</h3>
      <button
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        View Products
      </button>
    </div>
  );
};

export default HomeCategoryCard;
