import { BrowserRouter } from 'react-router-dom';
//import MainContent from './MainContent';
import SideBar from './SideBar';
import MotherScreen from './MotherScreen/MotherScreen';

export default function RouteFile() {
  return (
    <div 
      className="route-file" 
      style={{ 
        display: 'flex', 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden'
      }}
    > 
      <BrowserRouter>
        <SideBar />
        {/* We wrap MotherScreen in a container that grabs all remaining space */}
        <div style={{ flex: 1, overflowY: 'auto', height: '100%' }}>
          <MotherScreen />
        </div>
      </BrowserRouter>
    </div>
  );
}