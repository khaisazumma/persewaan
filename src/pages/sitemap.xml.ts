import { fetchProducts } from '../lib/fetchData'

export async function GET() {
  const products = await fetchProducts()

  const urls = [
    'https://wexplore.id/',
    'https://wexplore.id/catalog',
    'https://wexplore.id/about',
    'https://wexplore.id/faq',
    'https://wexplore.id/contact',
    'https://wexplore.id/cart',
    ...products.map(p => `https://wexplore.id/catalog/${p.id}`)
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `<url><loc>${url}</loc></url>`).join('\n  ')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
