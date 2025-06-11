const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl w-full space-y-8'>
        <div className='bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-700'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>Acerca de</h1>
            <p className='text-gray-300'>
              Conoce más acerca de esta aplicación
            </p>
          </div>

          {/* Content */}
          <div className='space-y-6 text-gray-300'>
            <div>
              <h2 className='text-xl font-semibold text-white mb-3'>
                ¿Qué es esta aplicación?
              </h2>
              <p className='leading-relaxed'>
                Esta es una aplicación diseñada para ayudar a DJs y otras
                personas que necesiten archivos MP3 de buena calidad,
                permitiéndoles conseguirlos de forma rápida y sencilla.
              </p>
            </div>

            <div>
              <h2 className='text-xl font-semibold text-white mb-3'>
                Características principales
              </h2>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <svg
                    className='h-5 w-5 text-green-500 mr-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Descarga de música en alta calidad
                </li>
                <li className='flex items-center'>
                  <svg
                    className='h-5 w-5 text-green-500 mr-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Interfaz intuitiva y fácil de usar
                </li>
                <li className='flex items-center'>
                  <svg
                    className='h-5 w-5 text-green-500 mr-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Autenticación segura con Supabase
                </li>
                <li className='flex items-center'>
                  <svg
                    className='h-5 w-5 text-green-500 mr-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Descarga en segundos
                </li>
              </ul>
            </div>
          </div>

          {/* Botón para ir al login */}
          <div className='mt-8 pt-6 border-t border-gray-700'>
            <a
              href='/'
              className='w-full inline-flex justify-center py-3 px-4 rounded-lg font-medium text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900 bg-green-500 hover:bg-green-400 active:bg-green-600 transform hover:scale-[1.02] active:scale-[0.98]'
            >
              <div className='flex items-center'>Volver al inicio</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
