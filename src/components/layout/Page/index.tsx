import type { HTMLAttributes } from "react";
import { StyledPage } from "./styles";


interface PageProps extends HTMLAttributes<HTMLElement> {}

export function Page({ children, ...props}: PageProps) {
    return (
        <StyledPage {...props}>
            {children}
        </StyledPage>
    )
}