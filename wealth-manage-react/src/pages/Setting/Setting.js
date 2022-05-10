import { ExitToApp } from '@mui/icons-material'
import { Button, Fab } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Setting.css'

const Setting = () => {
  const [pwd, setPwd] = useState('')
  const pattern = /^[\d]*$/
  const navigate = useNavigate()

  function quit() {
    navigate(-1)
  }

  function submit() {
    window.Android.submitPassword(pwd)
  }

  const handleChange = (e) => {
    if (pattern.test(e.target.value)) {
      setPwd(e.target.value)
    }
  }
  return (
    <div className='setting'>
      <h3>请输入密码</h3>
      <input type="password" maxLength="6" value={pwd} onChange={handleChange} />
      <Button onClick={submit} sx={{
        float: 'right',
        mt: 1
      }} color="secondary" variant="contained">设置</Button>
      <Fab color="default" aria-label="add" onClick={quit}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32
        }}>
        <ExitToApp />
      </Fab>
    </div>
  )
}

export default Setting