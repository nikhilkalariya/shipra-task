'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Overviewnav from './Overviewnav';


const tabs = [
  { name: 'Overview', href: '/overview' },
  { name: 'Performance', href: '/performance' },
  { name: 'Technical', href: '/technical' },
  { name: 'Trading', href: '/trading' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Holdings', href: '/holdings' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b  sticky top-0 z-10">
      <Overviewnav/>
      <div className="flex gap-6 px-6 py-4 ">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`text-sm font-medium pb-2 border-b-2${ pathname === tab.href
                ? 'text-green-600 hover:border-green-600'
                : 'text-gray-600 border-transparent hover:border-blue-500'
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
