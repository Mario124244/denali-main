import React from "react";

interface BlinkingCharacterProps {
  openImg: string;
  closedImg: string;
  alt: string;
  isHovered?: boolean;
}

const BlinkingCharacter: React.FC<BlinkingCharacterProps> = ({
  openImg,
  closedImg,
  alt,
  isHovered = false,
}) => {
  return (
    <img
      src={isHovered ? openImg : closedImg}
      alt={alt}
      style={{
        width: "90px",
        transition: "all 0.3s ease-in-out",
      }}
    />
  );
};

export default BlinkingCharacter;
