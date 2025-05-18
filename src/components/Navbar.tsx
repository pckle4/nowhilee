
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md py-3 shadow-md' : 'py-6',
        className
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold font-space">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Jhon.dev
          </span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
            Resume
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </Button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          'md:hidden absolute w-full bg-background/95 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-64 py-4' : 'max-h-0'
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <NavLinks mobile onClick={() => setIsMobileMenuOpen(false)} />
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 w-full">
            Resume
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ mobile, onClick }) => {
  const links = [
    { name: 'Home', href: '#' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];
  
  return (
    <>
      {links.map(link => (
        <a 
          key={link.name} 
          href={link.href}
          onClick={onClick}
          className={cn(
            'font-medium transition-colors hover:text-primary',
            mobile ? 'block py-2' : ''
          )}
        >
          {link.name}
        </a>
      ))}
    </>
  );
};

export default Navbar;
