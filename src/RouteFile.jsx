
import { BrowserRouter } from 'react-router-dom';
import MotherScreen from './MotherScreen/MotherScreen';

export default function RouteFile() {
  return (
    <div
      className="route-file"
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <BrowserRouter>
        <div
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          <MotherScreen />
        </div>
      </BrowserRouter>
    </div>
  );
}

