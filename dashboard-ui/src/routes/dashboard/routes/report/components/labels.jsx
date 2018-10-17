import React from 'react'
import {translate, Trans} from "react-i18next";

const MonthLabel=(props)=>{
  const {month, year} = props
  return <span><Trans>{month}</Trans>{year?' '+year:null}</span>
}

const QuarterLabel=(props)=>{
  const {start,end, year}=props
  return <span><MonthLabel month={start}></MonthLabel>{'-'}<MonthLabel month={end}></MonthLabel> {year}</span>
}


export {MonthLabel, QuarterLabel}
