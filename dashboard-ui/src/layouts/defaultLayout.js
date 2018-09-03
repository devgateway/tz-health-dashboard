import React from 'react'
import { Link } from 'react-router-dom'

import Selector from '../components/lanSelector'


export default (props) =>(
  <div className="app">
      <p><Selector></Selector></p>

        {props.children}
  </div>)
