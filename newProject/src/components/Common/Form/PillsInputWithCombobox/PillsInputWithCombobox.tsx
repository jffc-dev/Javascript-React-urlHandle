import { PillsInput, Pill, Combobox, Group, useCombobox } from '@mantine/core';
import { useState } from 'react';

interface OptionProps {
  id: number;
  name: string;
}

interface PillsInputWithComboboxProps {
  value: number[];
  onChange: (value: number[]) => void;
  options: OptionProps[];
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  allowCustomValues?: boolean;
}

export const PillsInputWithCombobox = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  disabled,
  allowCustomValues = false,
}: PillsInputWithComboboxProps) => {
  const [search, setSearch] = useState('');
  const stringValues = options
    .filter(option => value.includes(option.id))
    .map(option => option.name);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch('');
    },
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    const { id = 0 } = options.find(option => option.name === val) || {};
    if (!value.includes(id)) {
      onChange([...value, id]);
    }
    setSearch('');
  };

  const handleValueRemove = (val: string) => {
    const { id = 0 } = options.find(option => option.name === val) || {};
    onChange(value.filter(v => v !== id));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search.trim()) {
      event.preventDefault();

      // Si allowCustomValues está habilitado, agregar el valor personalizado

      if (allowCustomValues && !stringValues.includes(search.trim())) {
        handleValueSelect(search.trim());
      }
      // Si no, solo agregar si existe en las opciones
      else if (
        !allowCustomValues &&
        options.some(option => option.name === search.trim()) &&
        !stringValues.includes(search.trim())
      ) {
        handleValueSelect(search.trim());
      }
    }

    if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const pills = stringValues.map(item => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  // Filtrar opciones basado en el texto de búsqueda
  const filteredOptions = options.filter(
    item =>
      !stringValues.includes(item.name) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const comboboxOptions = filteredOptions.map(item => (
    <Combobox.Option value={item.name} key={item.id}>
      <Group gap="sm">
        <span>{item.name}</span>
      </Group>
    </Combobox.Option>
  ));

  // Opción para agregar valor personalizado
  const shouldShowCreateOption =
    allowCustomValues &&
    search.trim() &&
    !options.some(option => option.name === search.trim()) &&
    !stringValues.includes(search.trim());

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput label={label} error={error} disabled={disabled}>
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
};
