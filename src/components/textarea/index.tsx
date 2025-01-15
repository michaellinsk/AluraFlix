import { Textarea } from "@/components/ui/textarea";

interface TextareaTypeProps {
  placeholder: string;
  label: string;
  name: string;
  value?: string;
  width?: string;
  height?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextareaType({
  placeholder,
  label,
  name,
  value,
  onChange,
  width = "w-full",
  height = "h-[150px]",
}: TextareaTypeProps) {
  return (
    <div className={`flex flex-col gap-2 ${width}`}>
      <label htmlFor={name} className="text-white">
        {label}
      </label>

      <Textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`text-white ${height}`}
      />
    </div>
  );
}
