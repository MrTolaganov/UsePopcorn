import { useState } from "react";
import Star from "./star";

const StarRating = ({ maxRating = 5, onSetUserRating }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const onSetRating = rating => {
    setRating(rating);
    onSetUserRating(rating);
  };
  
  const onSetTempRating = rating => setTempRating(rating);

  return (
    <div style={containerStyle}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            isFull={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onSetRating={() => onSetRating(i + 1)}
            onHoverIn={() => onSetTempRating(i + 1)}
            onHoverOut={() => onSetTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
};

export default StarRating;

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const startContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
  color: "#fcc203",
  fontSize: "2.6rem",
};
