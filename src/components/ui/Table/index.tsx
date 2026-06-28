import type { TableHTMLAttributes } from "react";

import { TableContainer, StyledTable } from "./styles";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

export function Table({ children, ...props }: TableProps) {
  return (
    <TableContainer>
      <StyledTable {...props}>{children}</StyledTable>
    </TableContainer>
  );
}