import { Input } from "@/components/ui/input";

interface InputTypeProps {
  type: string;
  placeholder: string;
  label: string;
  name: string;
  value?: string;
  width?: string;
  height?: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputType({
  type,
  placeholder,
  label,
  name,
  value,
  onChange,
  width,
  height,
}: InputTypeProps) {
  return (
    <div className={`flex flex-col gap-2 ${width ? width : " w-[45%]"} `}>
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        required
        onChange={onChange}
        className={`text-white  ${height ? height : ""}`}
      />
    </div>
  );
}
