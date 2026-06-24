import type { Product, Package, Settings } from './types'

const CSV_PRODUCTS = import.meta.env.PUBLIC_GOOGLE_SHEET_CSV_PRODUCTS
const CSV_PACKAGES = import.meta.env.PUBLIC_GOOGLE_SHEET_CSV_PACKAGES
const CSV_SETTINGS = import.meta.env.PUBLIC_GOOGLE_SHEET_CSV_SETTINGS

function parseCSV(text: string): string[][] {
  const lines: string[][] = []
  let current: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        cell += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        current.push(cell.trim())
        cell = ''
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        current.push(cell.trim())
        if (current.some(c => c.length > 0)) {
          lines.push(current)
        }
        current = []
        cell = ''
        if (char === '\r') i++
      } else if (char !== '\r') {
        cell += char
      }
    }
  }

  if (cell.length > 0 || current.length > 0) {
    current.push(cell.trim())
    if (current.some(c => c.length > 0)) {
      lines.push(current)
    }
  }

  return lines
}

async function fetchCSV(url: string): Promise<string[][]> {
  try {
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) {
      console.error(`Failed to fetch CSV: ${response.status}`)
      return []
    }
    const text = await response.text()
    return parseCSV(text)
  } catch (error) {
    console.error('Error fetching CSV:', error)
    return []
  }
}

function parseBoolean(value: string): boolean {
  return value.toUpperCase() === 'TRUE'
}

function parseNumber(value: string): number {
  const num = parseInt(value.replace(/[^0-9-]/g, ''), 10)
  return isNaN(num) ? 0 : num
}

function getProductPriceByDuration(product: Product, days: number): number {
  switch (days) {
    case 1: return product.harga1Hari
    case 2: return product.harga2Hari
    case 3: return product.harga3Hari
    case 4: return product.harga4Hari
    case 5: return product.harga5Hari
    default: return product.harga1Hari
  }
}

function getPackagePriceByDuration(pkg: Package, days: number): number {
  switch (days) {
    case 1: return pkg.harga1Hari
    case 2: return pkg.harga2Hari
    case 3: return pkg.harga3Hari
    case 4: return pkg.harga4Hari
    case 5: return pkg.harga5Hari
    default: return pkg.harga1Hari
  }
}

function getMinPrice(product: Product): number {
  const prices = [
    product.harga1Hari,
    product.harga2Hari,
    product.harga3Hari,
    product.harga4Hari,
    product.harga5Hari
  ].filter(p => p > 0)
  return prices.length > 0 ? Math.min(...prices) : product.harga1Hari
}

function getMinPackagePrice(pkg: Package): number {
  const prices = [
    pkg.harga1Hari,
    pkg.harga2Hari,
    pkg.harga3Hari,
    pkg.harga4Hari,
    pkg.harga5Hari
  ].filter(p => p > 0)
  return prices.length > 0 ? Math.min(...prices) : pkg.harga
}

export async function fetchProducts(): Promise<Product[]> {
  const rows = await fetchCSV(CSV_PRODUCTS)
  if (rows.length < 2) return []

  const products: Product[] = []
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (row.length < 16) continue

    const aktif = parseBoolean(row[15])
    if (!aktif) continue

    const status = row[11] as 'Available' | 'Booked' | 'Maintenance'
    if (!['Available', 'Booked', 'Maintenance'].includes(status)) continue

    products.push({
      id: row[0],
      namaProduk: row[1],
      kategori: row[2],
      harga1Hari: parseNumber(row[3]),
      harga2Hari: parseNumber(row[4]),
      harga3Hari: parseNumber(row[5]),
      harga4Hari: parseNumber(row[6]),
      harga5Hari: parseNumber(row[7]),
      deskripsi: row[8],
      gambarUrl: row[9],
      stok: parseNumber(row[10]),
      status,
      bestSeller: parseBoolean(row[12]),
      produkBaru: parseBoolean(row[13]),
      urutan: parseNumber(row[14]),
      aktif
    })
  }

  return products.sort((a, b) => a.urutan - b.urutan)
}

export async function fetchPackages(): Promise<Package[]> {
  const rows = await fetchCSV(CSV_PACKAGES)
  if (rows.length < 2) return []

  const packages: Package[] = []
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    // Support both old format (6 columns) and new format (11 columns with per-day prices)
    if (row.length < 6) continue

    const aktif = parseBoolean(row[5])
    if (!aktif) continue

    const basePrice = parseNumber(row[2])
    const hasPerDayPrices = row.length >= 11

    packages.push({
      id: row[0],
      namaPaket: row[1],
      harga: basePrice,
      harga1Hari: hasPerDayPrices ? parseNumber(row[6]) || basePrice : basePrice,
      harga2Hari: hasPerDayPrices ? parseNumber(row[7]) || basePrice : basePrice,
      harga3Hari: hasPerDayPrices ? parseNumber(row[8]) || basePrice : basePrice,
      harga4Hari: hasPerDayPrices ? parseNumber(row[9]) || basePrice : basePrice,
      harga5Hari: hasPerDayPrices ? parseNumber(row[10]) || basePrice : basePrice,
      isiPaket: row[3],
      gambarUrl: row[4],
      aktif
    })
  }

  return packages
}

export async function fetchSettings(): Promise<Settings> {
  const rows = await fetchCSV(CSV_SETTINGS)
  if (rows.length < 2) {
    return {
      whatsapp: '6281234567890',
      instagram: '',
      tiktok: '',
      maps: '',
      address: 'Surabaya, Jawa Timur'
    }
  }

  const settings: Record<string, string> = {}
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (row.length >= 2) {
      settings[row[0].toLowerCase()] = row[1]
    }
  }

  return {
    whatsapp: settings.whatsapp || '6281234567890',
    instagram: settings.instagram || '',
    tiktok: settings.tiktok || '',
    maps: settings.maps || '',
    address: settings.address || 'Surabaya, Jawa Timur'
  }
}

export { getProductPriceByDuration, getPackagePriceByDuration, getMinPrice, getMinPackagePrice }
