import { InstallButton } from './components/InstallButton'

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InstallButton />
      {children}
    </>
  )
}
