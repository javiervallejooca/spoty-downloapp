import type { ChangeEvent } from 'preact/compat';
import { useContext, useState } from 'preact/hooks';
import { SessionContext } from '../context/SessionContext';
import { getEnvs } from '../helpers/getEnvs';

const DownloadYoutubeForm = () => {
  const [songUrl, setSongUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [songData, setSongData] = useState<any>(null);

  const { session } = useContext(SessionContext);

  const handleGetSong = async () => {
    if (!isValidUrl()) {
      alert('Por favor, introduce una URL de YouTube válida');
      return;
    }

    try {
      setLoading(true);
      setSongData(null);

      const SUPABASE_ID = getEnvs().APP_ID;

      const res = await fetch(
        `https://${SUPABASE_ID}.functions.supabase.co/getYoutubeMP3?id=${encodeURIComponent(
          songUrl
        )}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        alert('Error al obtener la información de la canción');
        return;
      }

      const data = await res.json();

      if (data.status !== 'ok') {
        alert(data.msg);
        return;
      }

      setSongData({
        title: data.title,
        filesize: data.filesize,
        downloadLink: data.link,
      });

      const link = document.createElement('a');
      link.href = data.link;
      link.download = `${data.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error calling function:', error);
      alert('Error de conexión');
    } finally {
      setSongUrl('');
      setLoading(false);
    }
  };

  const isValidUrl = () => {
    return songUrl.trim().length > 10 && songUrl.includes('youtube');
  };

  const formatFilesize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-xl w-full space-y-8'>
        <div className='bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-700'>
          <div>
            <h2 className='text-md font-bold text-white'>
              Descarga el MP3 de un video de Youtube
            </h2>

            <div className='mt-4'>
              <p className='text-white mb-3'>
                Usa esta herramienta para descargar el MP3 de Youtube sin tener
                que ir a una página llena de banners y varios botones de
                "descarga" 😄
              </p>
              <label className='block text-sm font-medium text-gray-200 mb-2'>
                URL de Youtube:
              </label>

              <input
                type='text'
                placeholder='Pega aquí el link'
                value={songUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  setSongUrl(target.value);
                }}
                required
                className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 placeholder-gray-400 text-white'
              />

              <div className='my-4 p-4 bg-red-900/20 rounded-lg border border-red-800'>
                <p className='text-xs text-red-300'>
                  <strong>Ejemplo:</strong>{' '}
                  https://www.youtube.com/watch?v=fC10oVwBOkI
                </p>
              </div>

              <button
                onClick={handleGetSong}
                disabled={loading || !isValidUrl()}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 focus:ring-offset-gray-900 ${
                  loading || !isValidUrl()
                    ? 'bg-red-700 cursor-not-allowed'
                    : 'bg-red-600 cursor-pointer hover:bg-red-500 active:bg-red-700 transform hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
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
                    Descargando...
                  </div>
                ) : (
                  'Descargar canción'
                )}
              </button>
            </div>

            {/* Mostrar información de la canción */}
            {songData && (
              <div className='border border-gray-400 p-4 mt-5 rounded-lg'>
                <p className='text-white'>
                  <strong>Título:</strong> {songData.title}
                </p>
                <p className='text-white'>
                  <strong>Tamaño:</strong> {formatFilesize(songData.filesize)}{' '}
                  MB
                </p>

                <div className='mt-4'>
                  <audio controls style={{ width: '100%' }} preload='metadata'>
                    <source src={songData.downloadLink} type='audio/mpeg' />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                </div>

                <div className='mt-4'>
                  <a
                    href={songData.downloadLink}
                    download
                    className='inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition'
                  >
                    Descargar MP3
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadYoutubeForm;
