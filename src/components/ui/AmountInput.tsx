'use client'

import { Input } from '@/components/ui/input'
import { formatNumber, parseNumber } from '@/utils/formatCurrency'
import { useState, useEffect } from 'react'

interface AmountInputProps {
    name: string
    placeholder?: string
    defaultValue?: number
    required?: boolean
    className?: string
    autoFocus?: boolean
    disabled?: boolean
}

export function AmountInput({
    name,
    placeholder = '0',
    defaultValue,
    required = false,
    className = '',
    autoFocus = false,
    disabled = false
}: AmountInputProps) {
    const [displayValue, setDisplayValue] = useState('')
    const [actualValue, setActualValue] = useState('')

    useEffect(() => {
        if (defaultValue) {
            setDisplayValue(formatNumber(defaultValue.toString()))
            setActualValue(defaultValue.toString())
        }
    }, [defaultValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const formatted = formatNumber(input)
        const parsed = parseNumber(formatted)

        setDisplayValue(formatted)
        setActualValue(parsed.toString())
    }

    return (
        <>
            <Input
                type="text"
                inputMode="numeric"
                value={displayValue}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                className={className}
                autoFocus={autoFocus}
                disabled={disabled}
            />
            {/* Hidden input with actual numeric value for form submission */}
            <input type="hidden" name={name} value={actualValue} />
        </>
    )
}
