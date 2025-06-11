import { route } from 'preact-router';
import type { ChangeEvent } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import { supabase } from '../config/supabaseClient';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes('access_token')) {
      setError(
        'Token de acceso no encontrado. Asegúrate de usar el enlace enviado a tu correo.'
      );
    }
  }, []);

  const handleUpdatePassword = async (e: Event) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (error) setError(error.message);
    else {
      setMessage('¡Contraseña actualizada! Serás redirigido al login...');
      setTimeout(() => route('/'), 3000);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-12'>
      <div className='max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-white mb-2'>
            Restablecer contraseña
          </h1>
          <p className='text-gray-400 text-sm'>
            Ingresa una nueva contraseña para tu cuenta
          </p>
        </div>

        {error && (
          <div className='p-4 bg-red-900/20 border-l-4 border-red-400 rounded-md text-sm text-red-300'>
            {error}
          </div>
        )}

        {message && (
          <div className='p-4 bg-green-900/20 border-l-4 border-green-400 rounded-md text-sm text-green-300'>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className='space-y-6'>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-200 mb-2'
            >
              Nueva contraseña
            </label>
            <input
              id='password'
              type='password'
              required
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                setPassword(target.value);
              }}
              className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200'
            />
          </div>

          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-200 mb-2'
            >
              Confirmar contraseña
            </label>
            <input
              id='confirmPassword'
              type='password'
              required
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                setConfirmPassword(target.value);
              }}
              className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900 ${
              loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-400 active:bg-green-600 transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {loading ? 'Actualizando...' : 'Actualizar contraseña'}
          </button>
          <div className='text-center'>
            <button
              type='button'
              onClick={() => route('/')}
              className='mt-2 text-sm text-green-400 hover:underline'
            >
              Volver al inicio de sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
