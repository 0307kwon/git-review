import React, {
  ChangeEvent,
  ReactNode,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { RootLabel } from "./Select.styles";
import { ReactComponent as DownArrow } from "../../../asset/icon/downArrow.svg";
import { PALETTE } from "../../../constant/palette";

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "type"> {
  width: string;
  labelText: string;
  onChange: (value: any) => void;
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
    <RootLabel width={width}>
      <span className="visually-hidden">{labelText}</span>
      <select
        onChange={onSelectChange}
        ref={selectRef}
        className="visually-hidden"
      >
        {children}
      </select>
      <div className="select-mark">
        <span className="select-word">{selectedValue ?? ""}</span>
        <DownArrow fill={PALETTE.GRAY_300} className="arrow" />
      </div>
    </RootLabel>
  );
};

export default Select;
