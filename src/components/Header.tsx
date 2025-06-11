import { useContext, useState } from 'preact/hooks';
import { supabase } from '../config/supabaseClient';
import { SessionContext } from '../context/SessionContext';

const Header = () => {
  const { session } = useContext(SessionContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/', label: 'Descargar' },
    { href: '/acerca-de', label: 'Acerca de' },
    //{ href: '/apoyar', label: 'Apoya el proyecto' },
  ];

  return (
    <header className='bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <h1 className='text-xl font-bold text-white flex items-center'>
              <span className='text-2xl mr-2'>🎶</span>
              SpotyDownloApp
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden lg:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className='text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center'
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* User info & mobile toggle */}
          <div className='flex items-center space-x-4'>
            {/* Desktop user area */}
            <div className='hidden lg:flex items-center space-x-4'>
              {session && (
                <div className='text-sm text-gray-300'>
                  <span>Hola, </span>
                  <span className='font-medium text-white'>
                    {session.user.email}
                  </span>
                </div>
              )}
              {session && (
                <button
                  onClick={handleLogout}
                  className='bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center'
                >
                  <span className='hidden sm:inline'>Cerrar sesión</span>
                </button>
              )}
            </div>

            {/* Mobile toggle */}
            <div className='lg:hidden'>
              <button
                onClick={toggleMobileMenu}
                className='text-gray-300 hover:text-white'
                aria-label='Abrir menú'
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d={
                      isMobileMenuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className='lg:hidden pb-4'>
            <div className='flex flex-col space-y-2'>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className='text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center'
                >
                  {item.label}
                </a>
              ))}
              {session && (
                <>
                  <div className='text-gray-400 text-sm px-3 py-2'>
                    Conectado como:{' '}
                    <span className='text-white'>{session.user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className='bg-red-600 hover:bg-red-700 cursor-pointer text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center'
                  >
                    <svg
                      className='h-4 w-4 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                      />
                    </svg>
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
