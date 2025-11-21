/**
 * Format a number string with thousand separators (Indonesian format)
 * Example: "1000000" -> "1.000.000"
 */
export function formatNumber(value: string): string {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, '')

    // If empty, return empty string
    if (!numbers) return ''

    // Add thousand separators (dots)
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Parse a formatted number string to a number
 * Example: "1.000.000" -> 1000000
 */
export function parseNumber(value: string): number {
    // Remove all dots (thousand separators)
    const cleaned = value.replace(/\./g, '')

    // Parse to number
    const num = parseInt(cleaned, 10)

    // Return 0 if NaN
    return isNaN(num) ? 0 : num
}

/**
 * Format a number for display with Indonesian currency format
 * Example: 1000000 -> "Rp 1.000.000"
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(amount)
}
