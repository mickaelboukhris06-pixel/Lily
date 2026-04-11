export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  return Response.json({
    name: 'Lily — Votre séjour',
    short_name: 'Lily',
    description: 'Toutes les infos de votre séjour en un lien.',
    start_url: `/g/${token}`,
    scope: `/g/${token}`,
    display: 'standalone',
    background_color: '#08080C',
    theme_color: '#08080C',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  })
}
