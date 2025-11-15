import {
  PillsInput,
  Pill,
  Combobox,
  Group,
  useCombobox,
  CloseButton,
} from '@mantine/core';
import { useState } from 'react';
import React from 'react';

interface OptionProps {
  id: number;
  name: string;
}

interface PillsInputWithComboboxProps {
  value: number[];
  onChange: (value: number[]) => void;
  options: OptionProps[];
  label?: React.ReactNode;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  allowCustomValues?: boolean;
}

interface PillsInputWithComboboxStringProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  label?: React.ReactNode;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  allowCustomValues?: boolean;
}

export function PillsInputWithCombobox(
  props: PillsInputWithComboboxProps
): React.JSX.Element;
export function PillsInputWithCombobox(
  props: PillsInputWithComboboxStringProps
): React.JSX.Element;
export function PillsInputWithCombobox({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  disabled,
  allowCustomValues = false,
}: PillsInputWithComboboxProps | PillsInputWithComboboxStringProps) {
  const [search, setSearch] = useState('');

  const isStringMode = typeof options[0] === 'string';

  const stringValues = isStringMode
    ? (value as string[])
    : (options as OptionProps[])
        .filter(option => (value as number[]).includes(option.id))
        .map(option => option.name);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch('');
    },
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    if (isStringMode) {
      const stringValue = value as string[];
      const stringOnChange = onChange as (value: string[]) => void;
      if (!stringValue.includes(val)) {
        stringOnChange([...stringValue, val]);
      }
    } else {
      const numericValue = value as number[];
      const numericOnChange = onChange as (value: number[]) => void;
      const { id = 0 } =
        (options as OptionProps[]).find(option => option.name === val) || {};
      if (!numericValue.includes(id)) {
        numericOnChange([...numericValue, id]);
      }
    }
    setSearch('');
  };

  const handleValueRemove = (val: string) => {
    if (isStringMode) {
      const stringValue = value as string[];
      const stringOnChange = onChange as (value: string[]) => void;
      stringOnChange(stringValue.filter(v => v !== val));
    } else {
      const numericValue = value as number[];
      const numericOnChange = onChange as (value: number[]) => void;
      const { id = 0 } =
        (options as OptionProps[]).find(option => option.name === val) || {};
      numericOnChange(numericValue.filter(v => v !== id));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search.trim()) {
      event.preventDefault();

      if (allowCustomValues && !stringValues.includes(search.trim())) {
        handleValueSelect(search.trim());
      } else if (!allowCustomValues) {
        if (isStringMode) {
          const stringOptions = options as string[];
          if (
            stringOptions.includes(search.trim()) &&
            !stringValues.includes(search.trim())
          ) {
            handleValueSelect(search.trim());
          }
        } else {
          const objectOptions = options as OptionProps[];
          if (
            objectOptions.some(option => option.name === search.trim()) &&
            !stringValues.includes(search.trim())
          ) {
            handleValueSelect(search.trim());
          }
        }
      }
    }

    if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
      if (isStringMode) {
        const stringValue = value as string[];
        const stringOnChange = onChange as (value: string[]) => void;
        stringOnChange(stringValue.slice(0, -1));
      } else {
        const numericValue = value as number[];
        const numericOnChange = onChange as (value: number[]) => void;
        numericOnChange(numericValue.slice(0, -1));
      }
    }
  };

  const pills = stringValues.map(item => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const filteredOptions = isStringMode
    ? (options as string[]).filter(
        item =>
          !stringValues.includes(item) &&
          item.toLowerCase().includes(search.toLowerCase())
      )
    : (options as OptionProps[]).filter(
        item =>
          !stringValues.includes(item.name) &&
          item.name.toLowerCase().includes(search.toLowerCase())
      );

  const comboboxOptions = filteredOptions.map(item => {
    if (isStringMode) {
      const stringItem = item as string;
      return (
        <Combobox.Option value={stringItem} key={stringItem}>
          <Group gap="sm">
            <span>{stringItem}</span>
          </Group>
        </Combobox.Option>
      );
    } else {
      const objectItem = item as OptionProps;
      return (
        <Combobox.Option value={objectItem.name} key={objectItem.id}>
          <Group gap="sm">
            <span>{objectItem.name}</span>
          </Group>
        </Combobox.Option>
      );
    }
  });

  const shouldShowCreateOption =
    allowCustomValues &&
    search.trim() &&
    !stringValues.includes(search.trim()) &&
    (isStringMode
      ? !(options as string[]).includes(search.trim())
      : !(options as OptionProps[]).some(
          option => option.name === search.trim()
        ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          label={label}
          error={error}
          disabled={disabled}
          labelProps={{ style: { width: '100%' } }}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              aria-label="Clear"
              onClick={() => onChange([])}
              style={{ display: value.length > 0 ? undefined : 'none' }}
            />
          }
        >
          <Pill.Group>
            {pills}
            <Combobox.EventsTarget>
              <PillsInput.Field
                placeholder={placeholder}
                value={search}
                onChange={event => {
                  setSearch(event.currentTarget.value);
                  combobox.updateSelectedOptionIndex();
                }}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={handleKeyDown}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {comboboxOptions}
          {comboboxOptions.length === 0 && !shouldShowCreateOption && (
            <Combobox.Empty>No options found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
