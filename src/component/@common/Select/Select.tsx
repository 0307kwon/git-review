import React, {
  ChangeEvent,
  ReactNode,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { RootSpan } from "./Select.styles";
import { ReactComponent as DownArrow } from "../../../asset/icon/downArrow.svg";
import { PALETTE } from "../../../constant/palette";

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "type"> {
  width: string;
  labelText: string;
  onChange: (value: unknown) => void;
  children: ReactNode;
}

const Select = ({ width, onChange, labelText, children, ...option }: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.currentTarget.value);
  };

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (!selectRef.current) return;

    setSelectedValue(selectRef.current.value);
  }, [selectRef]);

  return (
    <RootSpan width={width}>
      <label className="visually-hidden">
        <span>{labelText}</span>
        <select onChange={onSelectChange} ref={selectRef}>
          {children}
        </select>
      </label>
      <span>{selectedValue ?? ""}</span>
      <DownArrow fill={PALETTE.GRAY_300} className="arrow" />
    </RootSpan>
  );
};

export default Select;
