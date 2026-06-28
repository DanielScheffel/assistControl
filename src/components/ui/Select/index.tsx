import type { SelectHTMLAttributes } from "react";
import { StyledSelect } from "./styles";


interface SelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({
    children,
    ...props
}: SelectProps) {
    return (
        <StyledSelect {...props}>
            {children}
        </StyledSelect>
    )
}