import { PartItem } from '../types';

export const AUTO_PARTS_DATA: PartItem[] = [
  {
    id: '1',
    name: 'Ceramic Brake Pads (Front)',
    brand: 'Brembo',
    oem: '09.B338.11',
    category: 'Braking',
    price: 89.99,
    status: 'In Stock',
    description: 'Premium ceramic brake pads providing exceptional stopping power and low dust. Designed for high-performance and daily driving.',
    fitment: 'BMW 3 Series (F30) 2012-2019, 4 Series (F32) 2013-2020',
    images: ['https://picsum.photos/seed/brake1/800/600', 'https://picsum.photos/seed/brake2/800/600'],
    crossReference: ['D1561', '1561-D1561', 'BP1561']
  },
  {
    id: '2',
    name: 'Oil Filter High Capacity',
    brand: 'Mann-Filter',
    oem: 'HU 816 x',
    category: 'Filters',
    price: 12.50,
    status: 'In Stock',
    description: 'High-efficiency oil filter designed to remove contaminants from engine oil, ensuring optimal engine performance and longevity.',
    fitment: 'Mercedes-Benz C-Class (W204), E-Class (W212) 2008-2015',
    images: ['https://picsum.photos/seed/filter1/800/600'],
    crossReference: ['OX 153/7D', 'CH9911', 'L358']
  },
  {
    id: '3',
    name: 'Oxygen Sensor (Upstream)',
    brand: 'Bosch',
    oem: '17014',
    category: 'Sensors',
    price: 145.00,
    status: 'Out of Stock',
    description: 'Wideband A/F sensor for precise fuel management. Critical for fuel economy and emission control.',
    fitment: 'Toyota Camry 2012-2017, RAV4 2013-2018 (2.5L)',
    images: ['https://picsum.photos/seed/sensor1/800/600'],
    crossReference: ['234-9041', '89467-06080']
  },
  {
    id: '4',
    name: 'Ignition Coil Pack',
    brand: 'NGK',
    oem: '48003',
    category: 'Ignition',
    price: 45.20,
    status: 'In Stock',
    description: 'High-voltage ignition coil for reliable spark and improved combustion efficiency.',
    fitment: 'Volkswagen Golf MK7, Audi A3 (8V) 2013-2020 (1.8T/2.0T)',
    images: ['https://picsum.photos/seed/coil1/800/600'],
    crossReference: ['06K905110K', 'GN10632']
  },
  {
    id: '5',
    name: 'Air Filter Element',
    brand: 'K&N',
    oem: '33-2445',
    category: 'Filters',
    price: 55.00,
    status: 'In Stock',
    description: 'Washable and reusable high-flow air filter. Designed to increase horsepower and acceleration.',
    fitment: 'Honda Civic 2012-2015 (1.8L)',
    images: ['https://picsum.photos/seed/air1/800/600'],
    crossReference: ['17220-R1A-A01', 'AF5193']
  },
  {
    id: '6',
    name: 'Wheel Hub Assembly',
    brand: 'SKF',
    oem: 'VKBA 6649',
    category: 'Suspension',
    price: 185.00,
    status: 'In Stock',
    description: 'Precision-engineered wheel bearing and hub assembly for smooth and quiet operation.',
    fitment: 'Ford F-150 2009-2014 (4WD)',
    images: ['https://picsum.photos/seed/hub1/800/600'],
    crossReference: ['515119', '7L1Z1104A']
  },
  {
    id: '7',
    name: 'Fuel Pump Module',
    brand: 'Walbro',
    oem: 'GSS342',
    category: 'Fuel System',
    price: 95.00,
    status: 'In Stock',
    description: 'High-pressure 255LPH fuel pump for modified and performance vehicles.',
    fitment: 'Universal Performance Fitment',
    images: ['https://picsum.photos/seed/fuel1/800/600'],
    crossReference: ['FP-GSS342', '255-WAL']
  },
  {
    id: '8',
    name: 'Radiator Assembly',
    brand: 'Denso',
    oem: '221-3220',
    category: 'Cooling',
    price: 210.00,
    status: 'In Stock',
    description: 'Aluminum core radiator for maximum cooling efficiency. Direct fit replacement.',
    fitment: 'Lexus RX350 2010-2015, Toyota Highlander 2008-2013',
    images: ['https://picsum.photos/seed/rad1/800/600'],
    crossReference: ['16400-0P190', 'CU13123']
  }
];
