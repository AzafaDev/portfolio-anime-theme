import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SplashScreen from './components/sections/SplashScreen';
import PageTransition from './components/transitions/PageTransition';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Layout>
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </PageTransition>
    </Layout>
  );
}

export default App;
