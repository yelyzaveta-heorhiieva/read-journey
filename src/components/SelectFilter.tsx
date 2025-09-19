import Select, { type SingleValue } from 'react-select';
import type { OptionType } from '../types';

export interface SelectFilterProps {
  handleChange: (option: SingleValue<OptionType>) => void;
  selected: OptionType | null;
}

export const options = [
  { value: 'unread', label: 'Unread' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
  { value: 'all', label: 'All books' },
];

const classNames = {
  container: () =>
    'flex items-center justify-center w-[120px] h-10 rounded-xl bg-transparent border border-solid border-[#3e3e3e] md:w-[153px] md:h-[46px]',
  control: () =>
    'w-full border-none rounded-[14px] bg-transparent py-[12px] px-[14px] md:py-[14px]',
  input: () =>
    'font-medium text-xs leading-[133%] tracking-[-0.02em] md:text-sm md:leading-[129%]',
  valueContainer: () => '',
  menu: () => 'w-[120px]  bg-[#262626] rounded-xl p-[14px] mt-1 md:mt-2',
  menuList: () =>
    'flex flex-col gap-[7px] font-medium text-xs leading-[133%] tracking-[-0.02em] md:text-sm md:leading-[129%]',
  option: (state: any) =>
    `font-medium text-xs leading-[133%] tracking-[-0.02em] md:text-sm md:leading-[129%]
      ${
        state.isSelected
          ? 'text-[#f9f9f9]'
          : 'text-[#686868] hover:text-[#f9f9f9]'
      } `,
  placeholder: () =>
    'font-medium text-xs leading-[133%] tracking-[-0.02em] md:text-sm md:leading-[129%]',
  singleValue: () =>
    'font-medium text-xs leading-[133%] tracking-[-0.02em] md:text-sm md:leading-[129%]',
  dropdownIndicator: (state: any) =>
    `text-[#fbfbfb] ${
      state.selectProps.menuIsOpen ? 'rotate-180' : 'rotate-0'
    }`,
};

export default function SelectFilter({
  handleChange,
  selected,
}: SelectFilterProps) {
  return (
    <div>
      <Select
        options={options}
        onChange={handleChange}
        unstyled
        value={selected}
        placeholder='A to Z'
        isSearchable={false}
        classNames={classNames}
      />
    </div>
  );
}
