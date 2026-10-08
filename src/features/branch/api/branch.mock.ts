import type { Branch } from '../branch.types'

// Sample data shaped like the design. Addresses and phone numbers are fictional.
export const MOCK_BRANCHES: Branch[] = [
  {
    id: 1,
    name: 'Cụm sân Bờ Sông',
    address: '12 Đường Ven Sông',
    district: 'Quận 7',
    phone: '0901 000 001',
    openingTime: '05:00',
    closingTime: '23:00',
    distanceKm: 1.2,
    amenities: ['LIGHTING', 'PARKING', 'LOCKER_ROOM', 'CANTEEN'],
    offers: [
      { fieldType: 'FIVE_A_SIDE', surface: 'ARTIFICIAL', dayRate: 250_000, peakRate: 400_000 },
      { fieldType: 'SEVEN_A_SIDE', surface: 'ARTIFICIAL', dayRate: 400_000, peakRate: 650_000 },
      { fieldType: 'ELEVEN_A_SIDE', surface: 'NATURAL', dayRate: 1_200_000, peakRate: 1_800_000 },
    ],
  },
  {
    id: 2,
    name: 'Sân cỏ Phố Mới',
    address: '48 Phố Mới',
    district: 'Quận 3',
    phone: '0901 000 002',
    openingTime: '06:00',
    closingTime: '23:00',
    distanceKm: 2.8,
    amenities: ['PARKING'],
    offers: [
      { fieldType: 'SEVEN_A_SIDE', surface: 'ARTIFICIAL', dayRate: 400_000, peakRate: 650_000 },
    ],
  },
  {
    id: 3,
    name: 'Sân vận động Ánh Đèn',
    address: '3 Đại lộ Ánh Đèn',
    district: 'Thủ Đức',
    phone: '0901 000 003',
    openingTime: '05:00',
    closingTime: '22:00',
    distanceKm: 4.5,
    amenities: ['LIGHTING', 'LOCKER_ROOM'],
    offers: [
      { fieldType: 'ELEVEN_A_SIDE', surface: 'NATURAL', dayRate: 1_200_000, peakRate: 1_800_000 },
    ],
  },
]
