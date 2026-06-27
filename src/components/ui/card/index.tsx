import type { HTMLAttributes } from "react";
import { StyledCard } from "./styles";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: string;
}

export function Card({ children, padding = "24px", ...props }: CardProps) {
  return (
    <StyledCard padding={padding} {...props}>
      {children}
    </StyledCard>
  );
}