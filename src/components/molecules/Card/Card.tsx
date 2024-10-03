import { FC, ReactElement } from "react";

interface ICard {
  children: ReactElement;
}

const Card: FC<ICard> = ({ children }) => {
  return <div className="relative rounded-md p-5 bg-white">{children}</div>;
};

export default Card;
