import useLoadingState from '@/hooks/useLoadingState';
import { Outlet } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

function App() {
  const delayedLoading = useLoadingState(300);

  return (
    <div className="relative h-screen w-screen">
      {delayedLoading && (
        <div className='absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md'>
          <div className="relative bg-transparent">
            <RingLoader loading={delayedLoading} size={150} color='#15d4ae' />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default App;
