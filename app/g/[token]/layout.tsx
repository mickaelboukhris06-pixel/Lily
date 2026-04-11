import type { Metadata } from 'next'
import { InstallButton } from './components/InstallButton'

export async function generateMetadata(
  { params }: { params: Promise<{ token: string }> }
): Promise<Metadata> {
  const { token } = await params
  return {
    manifest: `/g/${token}/manifest.webmanifest`,
  }
}

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InstallButton />
      {children}
    </>
  )
}
