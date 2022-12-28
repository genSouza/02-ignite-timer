import { ButtonContainer, ButtonVariant } from './Button.styles';

interface ButtonProps {
  variant?: ButtonVariant;
  text: string;
}

export function Button({ variant = 'primary', text }: ButtonProps) {
  return <ButtonContainer variant={variant}>{text}</ButtonContainer>;
}
