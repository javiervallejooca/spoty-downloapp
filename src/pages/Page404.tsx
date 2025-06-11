const Page404 = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-700'>
          {/* Header */}
          <div className='text-center mb-8'>
            <p className='text-white'>
              La página que buscas no existe o se ha movido
            </p>
          </div>

          {/* GIF */}
          <div className='mb-8 flex justify-center'>
            <img
              src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzQ3OWpzNDM3YnBrMW03b3R5c3l1Z3BhcDRtNmh6d2phN2lsOGFwYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8lgqAbycBjosxjfi9k/giphy.gif'
              alt='404 Error Animation'
              className='rounded-lg max-w-full h-auto'
            />
          </div>

          {/* Botón de regreso */}
          <button
            onClick={() => window.history.back()}
            className='w-full py-3 px-4 rounded-lg font-medium text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900 bg-green-500 hover:bg-green-400 active:bg-green-600 transform hover:scale-[1.02] active:scale-[0.98]'
          >
            <div className='flex items-center justify-center'>
              <svg
                className='h-5 w-5 mr-2 text-black'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
              Volver atrás
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page404;
