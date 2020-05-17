import * as React from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const Container = styled.button`
  width: fit-content;
  min-width: 8rem;
  border: none;
  padding: 0.75rem 1.55rem;
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  background-color: var(--dark);
  cursor: pointer;

  &:active,
  &:focus,
  &:hover {
    background-image: linear-gradient(to right, #45e87b, #05e1f9);
  }
`;

const Button = ({ label, ...rest }: Props) => (
  <Container {...rest}>{label}</Container>
);

export default Button;
