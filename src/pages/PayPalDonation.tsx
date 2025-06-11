import type { ChangeEvent } from 'preact/compat';
import { useState } from 'preact/hooks';

const PayPalDonation = () => {
  const [amount, setAmount] = useState('5');
  const [isHovered, setIsHovered] = useState(false);

  // URL base de PayPal para donaciones
  const paypalBaseUrl = 'https://www.paypal.com/donate';

  const paypalEmail = 'javaoca@paypal.com';

  const handleDonate = () => {
    const donationUrl = `${paypalBaseUrl}/?business=${encodeURIComponent(
      paypalEmail
    )}&amount=${amount}&currency_code=EUR&item_name=${encodeURIComponent(
      'Donación de apoyo'
    )}`;
    window.open(donationUrl, '_blank');
  };

  const predefinedAmounts = ['3', '5', '10', '20', '50'];

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-xl w-full space-y-8'>
        <div className='bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-700'>
          <div>
            <div className='flex space-between'>
              <h2 className='flex w-full text-md font-bold text-white'>
                💝 Ayuda a mantener vivo este proyecto
              </h2>
            </div>

            <div className='mt-4'>
              <p className='text-sm text-gray-300 mb-4'>
                Si te gusta esta herramienta y quieres ayudar a mantenerla,
                puedes hacer una donación a través de PayPal.
              </p>

              <label
                htmlFor='amount'
                className='block text-sm font-medium text-gray-200 mb-2'
              >
                Cantidad a donar:
              </label>

              {/* Botones de cantidad predefinida */}
              <div className='grid grid-cols-5 gap-2 mb-4'>
                {predefinedAmounts.map((preAmount) => (
                  <button
                    key={preAmount}
                    onClick={() => setAmount(preAmount)}
                    className={`py-2 px-3 text-sm rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                      amount === preAmount
                        ? 'bg-green-500 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                    }`}
                  >
                    {preAmount}€
                  </button>
                ))}
              </div>

              {/* Input personalizado */}
              <div className='relative mb-4'>
                <input
                  id='amount'
                  type='number'
                  min='1'
                  step='0.01'
                  placeholder='Cantidad personalizada'
                  value={amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement;
                    setAmount(target.value);
                  }}
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-400 text-white'
                />
                <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  €
                </span>
              </div>

              <div className='my-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800'>
                <p className='text-xs text-blue-300'>
                  <strong>Información:</strong> Serás redirigido a PayPal para
                  completar la donación de forma segura.
                </p>
              </div>

              <button
                onClick={handleDonate}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={!amount || parseFloat(amount) <= 0}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900 ${
                  !amount || parseFloat(amount) <= 0
                    ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                    : 'bg-green-500 cursor-pointer hover:bg-green-400 active:bg-green-600 transform hover:scale-[1.02] active:scale-[0.98] text-black'
                }`}
              >
                <div className='flex items-center justify-center'>
                  <svg
                    className={`mr-2 h-5 w-5 transition-transform duration-200 ${
                      isHovered ? 'scale-110' : ''
                    }`}
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm1.659-13.9h2.19c2.08 0 3.755-.439 4.476-2.05.066-.148.118-.311.17-.479.404-2.142-.059-2.906-.618-3.514C14.358.861 13.126.861 11.538.861H6.18L4.916 7.437h2.819z' />
                  </svg>
                  Donar {amount || '0'}€ con PayPal
                </div>
              </button>

              <div className='mt-4 text-center'>
                <p className='text-xs text-gray-400'>
                  ❤️ ¡Gracias por tu apoyo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalDonation;
