import { Product } from '@/types/product';

// Helper function to generate a license key
const generateLicenseKey = () => {
  const segments = 4;
  const segmentLength = 4;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segmentLength; j++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < segments - 1) key += '-';
  }
  
  return key;
};

// Base features for each tier
const getTierFeatures = (tier: 'basic' | 'vip' | 'gold', gameVersion: string) => {
  const baseFeatures = [
    `Full access to ${gameVersion} software`,
    'Regular updates',
    'Basic support',
    'Automatic updates',
    'Basic configuration options',
  ];

  const vipFeatures = [
    ...baseFeatures,
    'Priority support',
    'Discord access',
    'Custom configurations',
    'Advanced features',
    'Premium configurations',
    'Extended customization',
  ];

  const goldFeatures = [
    ...vipFeatures,
    '24/7 VIP support',
    'Private Discord channel',
    'Beta features access',
    'Exclusive monthly rewards',
    'Multi-device support',
    'Premium configurations',
    'All future updates',
    'Custom feature requests',
  ];

  switch (tier) {
    case 'basic':
      return baseFeatures;
    case 'vip':
      return vipFeatures;
    case 'gold':
      return goldFeatures;
  }
};

// Unlock products
const unlockProducts: Product[] = [
  {
    id: 'camo',
    name: 'Camo Service B06',
    description: 'Unlock all mastery camos instantly with lifetime updates.',
    price: 29.99,
    status: 'undetected',
    image: '',
    rating: 4.8,
    securityRating: 9,
    platforms: ['windows', 'xbox', 'playstation'],
    category: 'unlock',
    noSubscription: true,
    features: [
      'Instant unlock for all mastery camos',
      'Automatic updates for new weapons',
      'Compatible with all DLC weapons',
      'Clean and user-friendly interface',
      'Lifetime access to updates',
      '24/7 priority support'
    ],
    requirements: [
      'Compatible with Xbox Series S/X, PS4, or PS5',
      'Activision account required, or Xbox Game Pass (PC) with linked Activision account',
    ],
    faq: [
      {
        question: 'How long does it take to unlock camos?',
        answer: 'The process is instant. Once activated, all mastery camos will be available immediately.'
      },
      {
        question: 'Do I get access to future weapon camos?',
        answer: 'Yes, the service includes lifetime updates for all new weapons and camos released.'
      },
      {
        question: 'Is this safe to use?',
        answer: 'Our service uses advanced security measures and remains undetected. We constantly update our security protocols.'
      }
    ]
  },
  {
    id: 'operator-bundle',
    name: 'Pro Operator Bundle',
    description: 'Access all operators and exclusive skins instantly.',
    price: 39.99,
    status: 'undetected',
    image: '',
    rating: 4.9,
    securityRating: 9,
    platforms: ['windows', 'xbox', 'playstation'],
    category: 'unlock',
    noSubscription: true,
    features: [
      'Unlock all operators instantly',
      'Access to exclusive operator skins',
      'Premium customization options',
      'Regular content updates',
      'Cross-platform compatibility',
      'Priority customer support'
    ],
    requirements: [
      'Compatible with Xbox Series S/X, PS4, or PS5',
      'Activision account required, or Xbox Game Pass (PC) with linked Activision account',
    ],
    faq: [
      {
        question: 'Do I get access to future operators?',
        answer: 'Yes, your purchase includes access to all future operator releases.'
      },
      {
        question: 'Can I use this on multiple platforms?',
        answer: 'Yes, the bundle works across all supported platforms with the same account.'
      },
      {
        question: 'How often do you add new content?',
        answer: 'We update our service with each new game update to include all new operators and skins.'
      }
    ]
  }
];

// Software products
const softwareProducts: Product[] = [
  {
    id: 'mw2',
    name: 'Modern Warfare 2',
    description: 'Professional software suite for Call of Duty: Modern Warfare 2. Features include advanced customization, performance optimization, and premium support.',
    price: 29.99, // Base price
    status: 'undetected',
    image: '',
    rating: 4.9,
    securityRating: 9,
    platforms: ['windows'],
    category: 'software',
    tiers: {
      basic: {
        name: 'Basic',
        price: 29.99,
        features: getTierFeatures('basic', 'MW2'),
      },
      vip: {
        name: 'VIP',
        price: 49.99,
        features: getTierFeatures('vip', 'MW2'),
      },
      gold: {
        name: 'Gold',
        price: 79.99,
        features: getTierFeatures('gold', 'MW2'),
      },
    },
    durations: [
      { months: 1, name: '1 Month', discount: 0 },
      { months: 3, name: '3 Months', discount: 0.1 },
      { months: 6, name: '6 Months', discount: 0.15 },
      { months: 12, name: '12 Months', discount: 0.2 },
    ],
    requirements: [
      'Windows 10/11 64-bit',
      'Intel/AMD CPU with VT-d support',
      'Minimum 16GB RAM',
      'Active game installation',
      'Administrator privileges',
      'Stable internet connection',
    ],
    faq: [
      {
        question: 'Is this safe to use?',
        answer: 'Yes, our software uses advanced security measures and remains undetected. We constantly update our protection systems.',
      },
      {
        question: 'How often do you update?',
        answer: 'We provide updates within hours of any game patch to ensure compatibility and safety.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 24-hour money-back guarantee if you are not satisfied with our service.',
      },
    ],
  },
  {
    id: 'mw3',
    name: 'Modern Warfare 3',
    description: 'Premium software package for Call of Duty: Modern Warfare 3. Includes advanced features, real-time updates, and dedicated support.',
    price: 34.99,
    status: 'undetected',
    image: '',
    rating: 4.9,
    securityRating: 9,
    platforms: ['windows'],
    category: 'software',
    tiers: {
      basic: {
        name: 'Basic',
        price: 34.99,
        features: getTierFeatures('basic', 'MW3'),
      },
      vip: {
        name: 'VIP',
        price: 54.99,
        features: getTierFeatures('vip', 'MW3'),
      },
      gold: {
        name: 'Gold',
        price: 84.99,
        features: getTierFeatures('gold', 'MW3'),
      },
    },
    durations: [
      { months: 1, name: '1 Month', discount: 0 },
      { months: 3, name: '3 Months', discount: 0.1 },
      { months: 6, name: '6 Months', discount: 0.15 },
      { months: 12, name: '12 Months', discount: 0.2 },
    ],
    requirements: [
      'Windows 10/11 64-bit',
      'Intel/AMD CPU with VT-d support',
      'Minimum 16GB RAM',
      'Active game installation',
      'Administrator privileges',
      'Stable internet connection',
    ],
    faq: [
      {
        question: 'Is this safe to use?',
        answer: 'Yes, our software uses advanced security measures and remains undetected. We constantly update our protection systems.',
      },
      {
        question: 'How often do you update?',
        answer: 'We provide updates within hours of any game patch to ensure compatibility and safety.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 24-hour money-back guarantee if you are not satisfied with our service.',
      },
    ],
  }
];

// Combine unlock products with software products
export const products: Product[] = [
  ...unlockProducts,
  ...softwareProducts,
];