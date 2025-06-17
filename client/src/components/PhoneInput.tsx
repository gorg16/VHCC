import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { arabicCountries } from "../lib/mockData";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  label?: string;
  placeholder?: string;
}

export default function PhoneInput({ 
  value, 
  onChange, 
  countryCode, 
  onCountryCodeChange, 
  label = "Mobile Number",
  placeholder = "00 0000000"
}: PhoneInputProps) {
  const selectedCountry = arabicCountries.find(country => country.code === countryCode) || arabicCountries[0];

  return (
    <div>
      <Label className="block text-sm font-medium text-gray-700 mb-2">{label}</Label>
      <div className="flex space-x-2">
        <Select value={countryCode} onValueChange={onCountryCodeChange}>
          <SelectTrigger className="w-32 rounded-xl bg-gray-50 border-gray-200">
            <SelectValue>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-sm font-medium">{selectedCountry.code}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {arabicCountries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm">{country.code}</span>
                  <span className="text-sm text-gray-600">{country.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="tel"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-xl"
        />
      </div>
    </div>
  );
}