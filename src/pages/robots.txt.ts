export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://wexplore.id/sitemap.xml`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
