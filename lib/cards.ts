export type CardType = 'wifi' | 'checkin' | 'checkout' | 'rules' | 'contact' | 'transport' | 'tips'

export interface WifiData {
  ssid: string
  password: string
}

export interface CheckinData {
  instructions: string
  code?: string
  keyLocation?: string
  checkInTime?: string
}

export interface CheckoutData {
  instructions: string
  checkOutTime?: string
}

export interface RulesData {
  rules: string
}

export interface ContactData {
  name: string
  phone?: string
  email?: string
  notes?: string
}

export interface TransportData {
  instructions: string
}

export interface TipsData {
  recommendations: string
}

export const CARD_CONFIGS: Record<CardType, {
  label: string
  subtitle: string
  route: string
  accentClass: string
  iconPath: string
}> = {
  wifi: {
    label: 'Wi-Fi',
    subtitle: 'Réseau et mot de passe',
    route: 'wifi',
    accentClass: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    iconPath: 'M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01',
  },
  checkin: {
    label: 'Check-in',
    subtitle: 'Arrivée et accès',
    route: 'checkin',
    accentClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    iconPath: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
  },
  checkout: {
    label: 'Check-out',
    subtitle: 'Départ et instructions',
    route: 'checkout',
    accentClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    iconPath: 'M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8',
  },
  rules: {
    label: 'Règlement',
    subtitle: 'Règles du logement',
    route: 'regles',
    accentClass: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    iconPath: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  contact: {
    label: 'Contact',
    subtitle: 'Coordonnées',
    route: 'contact',
    accentClass: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
    iconPath: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4.12h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  },
  transport: {
    label: 'Transport',
    subtitle: 'Comment accéder',
    route: 'transport',
    accentClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  },
  tips: {
    label: 'Bons plans',
    subtitle: 'Recommandations locales',
    route: 'bons-plans',
    accentClass: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    iconPath: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z',
  },
}

export const CARD_ORDER: CardType[] = ['wifi', 'checkin', 'checkout', 'rules', 'contact', 'transport', 'tips']
