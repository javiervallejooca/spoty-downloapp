import type { ChangeEvent } from 'preact/compat';
import { useContext, useState } from 'preact/hooks';
import { SessionContext } from '../context/SessionContext';
import { getEnvs } from '../helpers/getEnvs';

const DownloadForm = () => {
  const [songUrl, setSongUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [songData, setSongData] = useState<any>(null);

  const { session } = useContext(SessionContext);

  const handleGetSong = async () => {
    if (!isValidUrl()) {
      alert('Por favor, introduce una URL de Spotify válida');
      return;
    }

    try {
      setLoading(true);
      setSongData(null);

      const SUPABASE_ID = getEnvs().APP_ID;

      const res = await fetch(
        `https://${SUPABASE_ID}.functions.supabase.co/getSpotifySongInfo?song=${encodeURIComponent(
          songUrl
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      console.log('Response status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        alert('Error al obtener la información de la canción');
        return;
      }

      const data = await res.json();
      console.log('Song Info:', data);

      if (!data.success) alert(data.message);

      // Guardar la información de la canción
      if (data.success && data.data) {
        setSongData(data.data);
      }
    } catch (error) {
      console.error('Error calling function:', error);
      alert('Error de conexión');
    } finally {
      setSongUrl('');
      setLoading(false);
    }
  };

  const isValidUrl = () => {
    return songUrl.trim().length > 10 && songUrl.includes('open.spotify');
  };

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-xl w-full space-y-8'>
        <div className='bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-700'>
          <div>
            <div className='flex space-between'>
              <h2 className='flex w-full text-md font-bold text-white'>
                Descarga canciones desde Spotify
              </h2>
            </div>

            <div className='mt-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-200 mb-2'
              >
                URL de compartir canción de Spotify:
              </label>

              <div className='relative'>
                <input
                  id='email'
                  type='email'
                  placeholder='Pega aqui el link'
                  value={songUrl}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement;
                    setSongUrl(target.value);
                  }}
                  required
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-400 text-white'
                />
              </div>

              <div className='my-4 p-4 bg-green-900/20 rounded-lg border border-green-800'>
                <p className='text-xs text-green-300'>
                  <strong>Ejemplo:</strong>{' '}
                  https://open.spotify.com/track/61VeJ59zufLceZXb1SSVKu
                </p>
              </div>

              <button
                type='submit'
                onClick={handleGetSong}
                disabled={loading || !isValidUrl()}
                className={`w-full py-3 px-4 rounded-lg font-medium text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:ring-offset-gray-900 ${
                  loading || !isValidUrl()
                    ? 'bg-green-700 cursor-not-allowed'
                    : 'bg-green-500 cursor-pointer hover:bg-green-400 active:bg-green-600 transform hover:scale-[1.02] active:scale-[0.98]'
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
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Obteniendo canción...
                  </div>
                ) : (
                  'Obtener canción'
                )}
              </button>
            </div>

            {/* Mostrar información de la canción */}
            {songData && (
              <div
                className={'border border-gray-400 p-4 mt-5'}
                style={{
                  borderRadius: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Portada del álbum */}
                  {songData.cover && (
                    <img
                      src={songData.cover}
                      alt={`Portada de ${songData.album}`}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  )}

                  <div>
                    <p className={'text-white'}>
                      <strong>Título:</strong> {songData.title}
                    </p>
                    <p className={'text-white'}>
                      <strong>Artista:</strong> {songData.artist}
                    </p>
                    <p className={'text-white'}>
                      <strong>Álbum:</strong> {songData.album}
                    </p>
                    <p className={'text-white'}>
                      <strong>Año:</strong> {songData.releaseDate}
                    </p>
                  </div>
                </div>

                {/* Reproductor de audio */}
                {songData.downloadLink && (
                  <div className={'mt-4'}>
                    <audio
                      controls
                      style={{ width: '100%' }}
                      preload='metadata'
                    >
                      <source src={songData.downloadLink} type='audio/mpeg' />
                      Tu navegador no soporta el elemento de audio.
                    </audio>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadForm;
