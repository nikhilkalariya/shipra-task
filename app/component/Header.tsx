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
    <nav className="bg-white sticky top-0 z-10">
      <Overviewnav/>
      <div className="flex gap-6 px-6 py-2 ">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`text-sm font-medium pb-2 ${ pathname === tab.href
                ? 'border-b-2 text-blue-500  border-blue-500'
                : ''
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
