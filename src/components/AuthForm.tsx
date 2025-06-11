import type { ChangeEvent, FormEvent } from 'preact/compat';
import { useContext, useState } from 'preact/hooks';

import { supabase } from '../config/supabaseClient';
import { SessionContext } from '../context/SessionContext';
import { getEnvs } from '../helpers/getEnvs';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isResetMode, setIsResetMode] = useState(false);

  const { setSession } = useContext(SessionContext);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) setError(error.message);
    else setSession(data.session);
  };

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getEnvs().FRONT_URL + 'nueva-contrasena',
    });

    setLoading(false);
    if (error) setError(error.message);
    else setMessage('Hemos enviado un correo para restablecer tu contraseña.');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-700'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>
              {isResetMode ? 'Recuperar contraseña' : 'Iniciar sesión'}
            </h1>
            <p className='text-gray-300'>
              {isResetMode
                ? 'Ingresa tu correo para recuperar tu contraseña'
                : 'Ingresa tus credenciales para continuar'}
            </p>
          </div>

          {error && (
            <div className='mb-4 p-4 bg-red-900/20 border-l-4 border-red-400 rounded-md'>
              <p className='text-sm text-red-300'>{error}</p>
            </div>
          )}

          {message && (
            <div className='mb-4 p-4 bg-green-900/20 border-l-4 border-green-400 rounded-md'>
              <p className='text-sm text-green-300'>{message}</p>
            </div>
          )}

          <form
            onSubmit={isResetMode ? handlePasswordReset : handleLogin}
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-200 mb-2'
              >
                Correo electrónico
              </label>
              <input
                id='email'
                type='email'
                placeholder='tu@email.com'
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  setEmail(target.value);
                }}
                required
                className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200'
              />
            </div>

            {!isResetMode && (
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-200 mb-2'
                >
                  Contraseña
                </label>
                <input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement;
                    setPassword(target.value);
                  }}
                  required
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200'
                />
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900 ${
                loading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-400 active:bg-green-600 transform hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-black'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                  {isResetMode ? 'Enviando...' : 'Iniciando sesión...'}
                </div>
              ) : isResetMode ? (
                'Enviar enlace'
              ) : (
                'Iniciar sesión'
              )}
            </button>

            <div className='text-center'>
              <button
                type='button'
                onClick={() => {
                  setIsResetMode(!isResetMode);
                  setError(null);
                  setMessage(null);
                }}
                className='mt-2 text-sm text-green-400 hover:underline'
              >
                {isResetMode
                  ? 'Volver al inicio de sesión'
                  : '¿Olvidaste tu contraseña?'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
