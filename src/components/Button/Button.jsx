import { Buttons } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return <Buttons onClick={onLoadMore}>Load more</Buttons>;
};
