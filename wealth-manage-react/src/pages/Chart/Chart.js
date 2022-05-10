import React, { useEffect, useRef } from 'react'
import Chartjs from 'chart.js/auto'
import { MoneyRounded } from '@mui/icons-material'

function Chart(props) {
  const chart = useRef()

  useEffect(() => {
    let money = 0
    let map = new Map()
    props.data.forEach((val) => {
      money = map.get(val.type)
      if (!money) money = 0
      map.set(val.type, val.money + money)
    })

    let labels = Array.from(map.keys())
    let data = Array.from(map.values())
    new Chartjs(chart.current, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '图表视图',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: data,
        }]
      },
      options: {}
    })
  }, [])
  return (
    <canvas ref={chart} id="chart"></canvas>
  )
}

export default Chart