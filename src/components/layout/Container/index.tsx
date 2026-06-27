import type { HTMLAttributes } from "react";
import { StyeledContainer } from "./styles";


interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ children, ...props}: ContainerProps) {
    return (
        <StyeledContainer {...props}>
            {children}
        </StyeledContainer>
    )
}