import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import path from './ultils/contants'
import { Home, Login, Register, Rental } from './containers/public'
import { System, CreatePost,ManagePost } from './containers/system' 
function App() {
  return (
    <div className=' w-screeen bg-primary'>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='*' element={<Rental />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.TIM_NGUOI_O_GHEP} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
        </Route>
        
        <Route path={path.SYSTEM} element={<System />}> 
          <Route path={path.MANAGE_POST} element={<ManagePost />} />  
          <Route path={path.CREATE_POST} element={<CreatePost />} />  
        </Route>
      </Routes>
    </div>
  );
}

export default App;
