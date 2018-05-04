import React from 'react'
import { Link } from 'react-router-dom'



export default (props) =>(
  <div className="app">
      <h1>Header</h1>
        <header>
            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link to='/reports'>Reports</Link></li>
              </ul>
            </nav>
          </header>

        {props.children}

        <hr></hr>
        ....
        <hr></hr>
  </div>)
