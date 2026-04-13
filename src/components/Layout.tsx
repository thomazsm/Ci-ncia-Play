import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Microscope, GraduationCap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Laboratório 3D', path: '/lab', icon: Microscope },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/30">
      <header className="sticky top-4 z-50 mx-4 md:mx-8 mb-8 print:hidden">
        <div className="glass rounded-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto shadow-lg shadow-primary/5">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary transition-colors duration-300">
              <GraduationCap className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              Ciência<span className="text-primary">Play</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 md:px-8 py-4 max-w-7xl print:p-0 print:m-0 print:max-w-none">
        <Outlet />
      </main>
      <footer className="mt-12 py-8 text-center text-sm text-muted-foreground print:hidden">
        <div className="flex flex-col items-center gap-2">
          <p>Desenvolvido para inspirar o aprendizado em Ciências.</p>
          <p className="font-medium">
            Criado com ❤️ por <span className="text-primary font-bold">Thomaz</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
