import type { CartItem } from './types'
import { formatRupiah } from './formatCurrency'

interface CustomerData {
  nama: string
  nomorHP: string
  alamat: string
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function generateWhatsAppMessage(
  cart: CartItem[],
  customer: CustomerData
): string {
  const packages = cart.filter(item => item.type === 'package')
  const products = cart.filter(item => item.type === 'product')
  const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0)

  let message = `Halo Admin WEXPLORE 👋

Saya ingin melakukan penyewaan.

━━━━━━━━━━━━━━━
DATA PENYEWA

Nama      : ${customer.nama}
Nomor HP  : ${customer.nomorHP}
Alamat    : ${customer.alamat}
`

  if (packages.length > 0) {
    message += `
━━━━━━━━━━━━━━━
PAKET
`
    packages.forEach(pkg => {
      message += `
${pkg.nama}
Qty        : ${pkg.qty}
Harga Paket: ${formatRupiah(pkg.harga)}
Subtotal   : ${formatRupiah(pkg.harga * pkg.qty)}
`
    })
  }

  if (products.length > 0) {
    message += `
━━━━━━━━━━━━━━━
PRODUK TAMBAHAN
`
    products.forEach(prod => {
      message += `
${prod.nama}
Tanggal Ambil  : ${formatDate(prod.tanggalAmbil || '')}
Tanggal Kembali: ${formatDate(prod.tanggalKembali || '')}
Durasi         : ${prod.durasi} Hari
Qty            : ${prod.qty}
Harga Sewa     : ${formatRupiah(prod.harga)}
Subtotal       : ${formatRupiah(prod.harga * prod.qty)}
`
    })
  }

  message += `
━━━━━━━━━━━━━━━
TOTAL PEMBAYARAN

${formatRupiah(total)}

━━━━━━━━━━━━━━━

Mohon informasi ketersediaan barang.

Terima kasih 🙏`

  return message
}

export function getWhatsAppUrl(whatsappNumber: string, message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}
