import packageJson from '../../package.json';

const Footer = () => {
  return (
    <footer className='bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 mt-auto'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center mb-4 md:mb-0'>
            <span className='text-gray-400 text-sm'>
              © {new Date().getFullYear()} SpotyDownloApp. Todos los derechos
              reservados.
            </span>
          </div>
          <div className='flex items-center space-x-6'>
            <span className='text-gray-400 text-sm'>
              Versión {packageJson.version}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
