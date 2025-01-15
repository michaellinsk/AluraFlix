import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectScrollProps {
  name: string;
  value: string;
  width?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
}

export function SelectScroll({ value, onChange, width }: SelectScrollProps) {
  return (
    <div
      className={`flex flex-col gap-2 ${width ? width : "w-[40%]"}  text-white`}
    >
      <p className="text-white">Categoria</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a categoria" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white">
          <SelectGroup>
            <SelectItem value="est">front-end</SelectItem>
            <SelectItem value="entretenimento">back-end</SelectItem>
            <SelectItem value="vlog">mobile</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
