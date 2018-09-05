import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import './layout.css'

export default (props) =>(
  <div className="app">
    <Header/>
    {props.children}
  </div>
)
