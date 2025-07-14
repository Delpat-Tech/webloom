import Link from 'next/link';

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/who-we-help', label: 'Who We Help' },
  { href: '/services', label: 'What We Do' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/proof', label: 'Proof' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/legal/privacy', label: 'Legal' },
];

export default function Header() {
  return (
    <header className="w-full bg-negative border-b border-gray-200 py-4 px-6 flex items-center justify-between font-body">
      <div className="text-primary font-headline text-2xl font-bold tracking-tight">
        <Link href="/home">Delpat</Link>
      </div>
      <nav className="flex gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-text hover:text-primary transition-colors font-medium"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/collaborate"
          className="ml-4 px-4 py-2 rounded bg-accent text-white font-semibold shadow hover:bg-accent/90 transition-colors"
        >
          Collaborate
        </Link>
      </nav>
    </header>
  );
} 