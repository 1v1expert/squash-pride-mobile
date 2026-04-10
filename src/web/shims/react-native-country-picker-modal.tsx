import React, {useMemo, useRef} from 'react';
import {View} from 'react-native';

export type CountryCode = string;
export type TranslationLanguageCode = 'common' | 'rus';
export type Country = {
  cca2: CountryCode;
  name: string;
};

export const DARK_THEME = {
  backgroundColor: '#131517',
  onBackgroundTextColor: '#ffffff',
};

const COUNTRIES: Country[] = [
  {cca2: 'RU', name: 'Russia'},
  {cca2: 'US', name: 'United States'},
  {cca2: 'GB', name: 'United Kingdom'},
  {cca2: 'DE', name: 'Germany'},
  {cca2: 'FR', name: 'France'},
  {cca2: 'ES', name: 'Spain'},
  {cca2: 'IT', name: 'Italy'},
  {cca2: 'UA', name: 'Ukraine'},
  {cca2: 'BY', name: 'Belarus'},
  {cca2: 'KZ', name: 'Kazakhstan'},
  {cca2: 'PL', name: 'Poland'},
  {cca2: 'TR', name: 'Turkey'},
  {cca2: 'CN', name: 'China'},
  {cca2: 'JP', name: 'Japan'},
  {cca2: 'KR', name: 'South Korea'},
  {cca2: 'IN', name: 'India'},
  {cca2: 'BR', name: 'Brazil'},
  {cca2: 'AR', name: 'Argentina'},
  {cca2: 'MX', name: 'Mexico'},
  {cca2: 'CA', name: 'Canada'},
  {cca2: 'AU', name: 'Australia'},
  {cca2: 'NL', name: 'Netherlands'},
  {cca2: 'SE', name: 'Sweden'},
  {cca2: 'NO', name: 'Norway'},
  {cca2: 'FI', name: 'Finland'},
  {cca2: 'DK', name: 'Denmark'},
  {cca2: 'CH', name: 'Switzerland'},
  {cca2: 'AT', name: 'Austria'},
  {cca2: 'BE', name: 'Belgium'},
  {cca2: 'CZ', name: 'Czech Republic'},
  {cca2: 'PT', name: 'Portugal'},
  {cca2: 'AE', name: 'United Arab Emirates'},
  {cca2: 'SA', name: 'Saudi Arabia'},
  {cca2: 'EG', name: 'Egypt'},
  {cca2: 'ZA', name: 'South Africa'},
];

type CountryPickerProps = {
  countryCode?: CountryCode;
  onSelect?: (country: Country) => void;
  renderFlagButton?: (props: {onOpen: () => void}) => React.ReactNode;
};

const CountryPicker = ({countryCode, onSelect, renderFlagButton}: CountryPickerProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const countries = useMemo(() => COUNTRIES, []);

  const onOpen = () => {
    selectRef.current?.focus();
    selectRef.current?.click();
  };

  if (renderFlagButton) {
    return (
      <View style={{position: 'relative'}}>
        {renderFlagButton({onOpen})}
        <select
          ref={selectRef}
          value={countryCode || ''}
          onChange={event => {
            const country = countries.find(item => item.cca2 === event.target.value);
            if (country) {
              onSelect?.(country);
            }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer',
            width: '100%',
            height: '100%',
          }}>
          <option value="">Select country</option>
          {countries.map(country => (
            <option key={country.cca2} value={country.cca2}>
              {country.name}
            </option>
          ))}
        </select>
      </View>
    );
  }

  return (
    <select
      ref={selectRef}
      value={countryCode || ''}
      onChange={event => {
        const country = countries.find(item => item.cca2 === event.target.value);
        if (country) {
          onSelect?.(country);
        }
      }}>
      <option value="">Select country</option>
      {countries.map(country => (
        <option key={country.cca2} value={country.cca2}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountryPicker;