import logo from './logo.svg';
import './App.css';
import UploadForm from './component/uploadVedioForm';
import { Routes, Route } from "react-router-dom";
import VideoList from './component/allVedio';
import VideoPlayer from './component/playVedio';

function App() {
  return (
    <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/videoslist" element={<VideoList />} />
          <Route path="/video/:videoId"  element={<VideoPlayer/>}/>

    </Routes>
    
  
  );
}

export default App;
