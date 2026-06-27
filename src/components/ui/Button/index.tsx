import type { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./styles";


type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = "primary",
    fullWidth = true,
    ...props
}: ButtonProps) {
    return (
        <StyledButton variant={variant} fullWidth={fullWidth} {...props}>
            {children}
        </StyledButton>
    )
}