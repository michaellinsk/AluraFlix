import { Button } from "@/components/ui/button";

interface ButtonSecondaryProps {
  name: string;
  variant?: "default" | "dark";
  typeButton?: "submit" | "button";
  onClickClear?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonSecondary({
  name,
  variant = "default",
  typeButton = "submit",
  onClickClear,
}: ButtonSecondaryProps) {
  const buttonStyle = variant === "dark" ? "bg-[#000000E5]" : "bg-transparent";

  return (
    <Button
      type={typeButton}
      variant="secondary"
      className={`${buttonStyle} text-white border`}
      onClick={onClickClear}
    >
      {name}
    </Button>
  );
}
