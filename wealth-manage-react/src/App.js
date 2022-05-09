import './App.css';
import Card from './components/Card/Card';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()
  function quit() {
  }
  // 创建数据库，创建数据对象
  useEffect(() => {
    let request = indexedDB.open('wealth')
    request.onupgradeneeded = (e) => {
      e.target.result.createObjectStore('payout', { keyPath: 'timeStamp' })
      e.target.result.createObjectStore('collection', { keyPath: 'timeStamp' })
      e.target.result.createObjectStore('notes', { keyPath: 'timeStamp' })
      console.log("数据库创建成功")
      e.target.result.close()
    }
  }, [])
  return (
    <div>
      <h1 className='start'>开始</h1>
      <div className="App">
        <Card gridCol="1 / 5" gridRow="1 / 3" title="支出管理" icon={<PaidIcon />} handleclick={() => { navigate('/payout') }} />
        <Card gridCol="5 / 9" gridRow="1 / 3" title="收入管理" icon={<AccountBalanceWalletIcon />} handleclick={() => { navigate('/collection') }} />
        <Card gridCol="1 / 5" gridRow="3 / 7" title="便签" icon={<FormatListNumberedIcon fontSize='large' />} handleclick={() => { navigate('/notes') }} />
        <Card gridCol="5 / 7" gridRow="3 / 5" title="设置" icon={<SettingsIcon />} handleclick={() => { navigate('/setting') }} />
        <Card gridCol="7 / 9" gridRow="3 / 5" title="帮助" icon={<HelpIcon />} handleclick={() => { navigate('/help') }} />
        <Card gridCol="5 / 9" gridRow="5 / 7" title="退出" icon={<ExitToAppIcon />} handleclick={quit} />
      </div>
    </div>
  );
}

export default App;
