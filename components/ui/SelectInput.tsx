import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
// import { ChevronDownIcon } from "@/components/ui/Icon";
import Icon from "@/components/ui/Icon";

interface Option {
  label: string;
  value: string;
}

interface Props {
  placeholder: string;
  options: Option[];
  className?: string;
}

export default function SelectInputComponent({
  placeholder,
  options,
  className,
}: Props) {
  return (
    <Select className={className}>
      <SelectTrigger variant="outline" size="md" className="rounded-2xl px-4 py-2 h-12 flex flex-row justify-between">
        <SelectInput placeholder={placeholder} className="rounded-2xl" />
        <Icon name="ChevronDown" size={24} color="gray" />
        {/* <SelectIcon className="mr-3" as={ChevronDownIcon} /> */}
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
