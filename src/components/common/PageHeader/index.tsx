import type { ReactNode } from "react";

import { Container, Info, Actions } from "./styles";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  children,
}: PageHeaderProps) {
  return (
    <Container>
      <Info>
        <h1>{title}</h1>

        {subtitle && <p>{subtitle}</p>}
      </Info>

      {children && <Actions>{children}</Actions>}
    </Container>
  );
}