export interface Product {
  id: string
  namaProduk: string
  kategori: string
  harga1Hari: number
  harga2Hari: number
  harga3Hari: number
  harga4Hari: number
  harga5Hari: number
  deskripsi: string
  gambarUrl: string
  stok: number
  status: 'Available' | 'Booked' | 'Maintenance'
  bestSeller: boolean
  produkBaru: boolean
  urutan: number
  aktif: boolean
}

export interface Package {
  id: string
  namaPaket: string
  harga: number
  harga1Hari: number
  harga2Hari: number
  harga3Hari: number
  harga4Hari: number
  harga5Hari: number
  isiPaket: string
  gambarUrl: string
  aktif: boolean
}

export interface Settings {
  whatsapp: string
  instagram: string
  tiktok: string
  maps: string
  address: string
}

export interface CartItem {
  type: 'product' | 'package'
  id: string
  nama: string
  gambar: string
  qty: number
  harga: number
  durasi?: number
  tanggalAmbil?: string
  tanggalKembali?: string
}
