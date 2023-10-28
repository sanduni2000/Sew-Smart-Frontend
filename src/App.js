import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import BaseLayout from './pages/components/baseLayout';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#a97fcb',
            colorBgContainer: '#ffff'
          }
        }}>
        <BaseLayout />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
