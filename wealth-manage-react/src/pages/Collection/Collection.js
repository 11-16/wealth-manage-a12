import './Collection.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import { Add as AddIcon, BarChart, ExitToApp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from '../Chart/Chart';


const Collection = () => {
  const [open, setOpen] = useState(false)
  const [money, setMoney] = useState(0)
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [chart, setChart] = useState(false)
  const [timeStamp, setTimeStamp] = useState(null)
  const [collections, setCollections] = useState([{ empty: true }])
  const [db, setDB] = useState(null)
  const navigate = useNavigate()

  function quit() {
    navigate(-1)
  }

  function db_put() {
    let request = db.transaction(['collection'], 'readwrite')
      .objectStore('collection')
      .put({ type, money: Number(money), date, note, timeStamp })

    request.onsuccess = () => {
      setOpen(false)
      setCollections((prev) => {
        if (prev[0].empty) return [{ type, money: Number(money), date, note, timeStamp }]
        let arr = [...prev], i = 0
        for (; i < prev.length; i++) {
          if (prev[i].timeStamp === timeStamp) {
            arr.splice(i, 1, { type, money: Number(money), date, note, timeStamp })
            break
          }
        }
        if (i === prev.length) {
          arr.push({ type, money: Number(money), date, note, timeStamp })
        }
        return arr
      })
    }
  }

  function handleEdit(e) {
    setOpen(true)
    setMoney(e.money)
    setType(e.type)
    setDate(e.date)
    setNote(e.note)
    setTimeStamp(e.timeStamp)
  }

  function handleAdd() {
    setOpen(true)
    setMoney(0)
    setType('')
    setDate('')
    setNote('')
    setTimeStamp(new Date())
  }

  function handleChart() {
    setChart(!chart)
  }

  function db_delete() {
    let request = db.transaction(['collection'], 'readwrite')
      .objectStore('collection')
      .delete(timeStamp)

    request.onsuccess = () => {
      setOpen(false)
      setCollections((prev) => {
        let arr = [...prev];
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].timeStamp === timeStamp) {
            arr.splice(i, 1)
            break
          }
        }
        if (arr.length === 0) {
          return [{ empty: true }]
        } else {
          return arr
        }
      })
    }
  }

  function handleTypeChange(e) {
    setType(e.target.value)
  }

  useEffect(() => {
    let request = indexedDB.open('wealth')
    request.onsuccess = (e) => {
      console.log("数据库打开成功")
      setDB(e.target.result)
      e.target.result.transaction('collection', 'readwrite')
        .objectStore('collection')
        .openCursor().onsuccess = (event) => {
          let cursor = event.target.result
          if (cursor) {
            setCollections((prev) => {
              if (prev[0].empty) {
                return [cursor.value]
              }
              else {
                return [...prev, cursor.value]
              }
            })
            cursor.continue()
          }
        }
    }
  }, [])

  return (
    <div>
      <div className="collection">
        <h1 className='title'>收入列表</h1>
        {
          chart ? <Chart data={collections} />
            :
            (collections[0].empty ? <h3>无数据</h3>
              :
              <List>
                {
                  collections.length !== 0 &&
                  collections.map((value, i) => {
                    return (
                      <ListItem onClick={() => {
                        handleEdit(value)
                      }} key={i} disablePadding>
                        <ListItemButton>
                          <ListItemText primary={`${i} / ${value.type} / ￥${value.money} / ${value.date} / ${value.note}`} />
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                }
              </List>
            )
        }
      </div>
      <Fab color="primary" aria-label="diagram" onClick={handleChart}
        sx={{
          position: 'fixed',
          bottom: 172,
          right: 32
        }}>
        <BarChart />
      </Fab>
      <Fab color="secondary" aria-label="add" onClick={handleAdd}
        sx={{
          position: 'fixed',
          bottom: 102,
          right: 32
        }}>
        <AddIcon />
      </Fab>
      <Fab color="default" aria-label="add" onClick={quit}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32
        }}>
        <ExitToApp />
      </Fab>
      <Dialog open={open} onClose={() => { setOpen(false) }}>
        <DialogTitle>收入记录</DialogTitle>
        <DialogContent>
          <InputLabel>金额</InputLabel>
          <TextField
            autoFocus
            type="number"
            value={money}
            onChange={(e) => {
              if (e.target.value >= 0) setMoney(e.target.value)
            }}
            fullWidth
            variant="standard"
          />
          <InputLabel sx={{ mt: 2 }}>类型</InputLabel>
          <Select
            fullWidth
            value={type}
            onChange={handleTypeChange}
            variant='standard'
          >
            <MenuItem value={"工资"}>工资</MenuItem>
            <MenuItem value={"抢劫"}>抢劫</MenuItem>
            <MenuItem value={"偷盗"}>偷盗</MenuItem>
          </Select>
          <InputLabel sx={{ mt: 2 }}>时间</InputLabel>
          <TextField
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
            }}
            fullWidth
            variant="standard"
          />
          <InputLabel sx={{ mt: 2 }}>备注</InputLabel>
          <TextField
            type="text"
            value={note}
            onChange={(e) => {
              setNote(e.target.value)
            }}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={db_delete}>删除记录</Button>
          <Button onClick={() => { setOpen(false) }}>取消</Button>
          <Button onClick={db_put}>确认</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Collection