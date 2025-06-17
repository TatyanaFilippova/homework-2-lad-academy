import { useState } from "react";

interface Props {
  title: string;
}

const TodoCard = ({ title }: Props) => {
  const [cardData, setCardData] = useState([]);
  return (
    <>
      <div>{title}</div>
      <input />
    </>
  );
};

export default TodoCard;
