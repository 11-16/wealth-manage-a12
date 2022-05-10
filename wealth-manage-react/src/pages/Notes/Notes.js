import './Notes.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import { Add as AddIcon, ExitToApp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Notes = () => {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState('')
  const [timeStamp, setTimeStamp] = useState(null)
  const [notes, setNotes] = useState([{ empty: true }])
  const [db, setDB] = useState(null)
  const navigate = useNavigate()

  function quit() {
    navigate(-1)
  }

  function db_put() {
    let request = db.transaction(['notes'], 'readwrite')
      .objectStore('notes')
      .put({ note, timeStamp })

    request.onsuccess = () => {
      setOpen(false)
      setNotes((prev) => {
        // empty为true，则返回只含一个对象的数组
        if (prev[0].empty) return [{ note, timeStamp }]
        let arr = [...prev], i = 0
        for (; i < prev.length; i++) {
          if (prev[i].timeStamp === timeStamp) {
            arr.splice(i, 1, { note, timeStamp })
            break
          }
        }
        if (i === prev.length) {
          arr.push({ note, timeStamp })
        }
        return arr
      })
    }
  }

  function handleEdit(e) {
    setOpen(true)
    setNote(e.note)
    setTimeStamp(e.timeStamp)
  }

  function handleAdd() {
    setOpen(true)
    setNote('')
    setTimeStamp(new Date())
  }

  function db_delete() {
    let request = db.transaction(['notes'], 'readwrite')
      .objectStore('notes')
      .delete(timeStamp)

    request.onsuccess = () => {
      setOpen(false)
      setNotes((prev) => {
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

  useEffect(() => {
    let request = indexedDB.open('wealth')
    request.onsuccess = (e) => {
      console.log("数据库打开成功")
      setDB(e.target.result)
      e.target.result.transaction('notes', 'readwrite')
        .objectStore('notes')
        .openCursor().onsuccess = (event) => {
          let cursor = event.target.result
          if (cursor) {
            setNotes((prev) => {
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
      <div className="notes">
        <h1 className='title'>便签</h1>
        {
          notes[0].empty ?
            <h3>无数据</h3> :
            <List>
              {
                notes.length !== 0 &&
                notes.map((value, i) => {
                  return (
                    <ListItem onClick={() => {
                      handleEdit(value)
                    }} key={i} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={`${i} / ${value.note}`} />
                      </ListItemButton>
                    </ListItem>
                  )
                })
              }
            </List>
        }
      </div>
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
        <DialogTitle>便签</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            value={note}
            autoFocus
            multiline
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

export default Notes