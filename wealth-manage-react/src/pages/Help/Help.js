import { ExitToApp } from '@mui/icons-material'
import { Fab } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Help.css'

const Help = () => {
  const navigate = useNavigate()

  function quit() {
    navigate(-1)
  }
  return (
    <div className="help">
      <h1>帮助</h1>
      <ul>
        <li>系统登录功能：用户使用密码登录系统，密码错误无法进入系统；</li>
        <li>支出管理：用户可以手动记录支出，包括支出的金额、类型、时间等。</li>
        <li>除此之外，还可以浏览已录入的支出信息、修改已录入的支出信息、删除支出信息，以及查看支出汇总；</li>
        <li>收入管理：用户可以手动记录收入信息，包括收入的金额、类别、时间等信息，录入后可以查看、修改、删除收入记录，以及查看收入汇总情况；</li>
        <li>便签管理：用户可以新增用于记录日常信息的便签，以及查看、修改、删除已录入的便签；</li>
        <li>系统设置：用户可以通过系统设置功能设置登录密码；</li>
        <li>帮助功能：用户通过查看帮助，可获取系统使用方法；</li>
        <li>退出功能：用户通过点击退出功能，返回登录界面。</li>
      </ul>
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

export default Help