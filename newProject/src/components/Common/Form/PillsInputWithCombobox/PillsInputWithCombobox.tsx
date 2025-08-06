import { PillsInput, Pill, Combobox, Group, useCombobox } from '@mantine/core';
import { useState } from 'react';

interface PillsInputWithComboboxProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
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

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch('');
    },
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    if (!value.includes(val)) {
      onChange([...value, val]);
    }
    setSearch('');
  };

  const handleValueRemove = (val: string) => {
    onChange(value.filter(v => v !== val));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && search.trim()) {
      event.preventDefault();

      // Si allowCustomValues está habilitado, agregar el valor personalizado
      if (allowCustomValues && !value.includes(search.trim())) {
        handleValueSelect(search.trim());
      }
      // Si no, solo agregar si existe en las opciones
      else if (
        !allowCustomValues &&
        options.includes(search.trim()) &&
        !value.includes(search.trim())
      ) {
        handleValueSelect(search.trim());
      }
    }

    if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const pills = value.map(item => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  // Filtrar opciones basado en el texto de búsqueda
  const filteredOptions = options.filter(
    item =>
      !value.includes(item) && item.toLowerCase().includes(search.toLowerCase())
  );

  const comboboxOptions = filteredOptions.map(item => (
    <Combobox.Option value={item} key={item}>
      <Group gap="sm">
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  // Opción para agregar valor personalizado
  const shouldShowCreateOption =
    allowCustomValues &&
    search.trim() &&
    !options.includes(search.trim()) &&
    !value.includes(search.trim());

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
