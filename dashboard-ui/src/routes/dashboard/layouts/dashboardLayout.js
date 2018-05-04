import React from 'react'
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

const component = (props) => (<div>
  <h1>Dashboard {props.name}</h1>
  <header>
    <nav>
      <ul>
        <li>
          <Link to='/dashboard/facilities'>Facilities</Link>
        </li>
        <li>
          <Link to='/dashboard/landing'>Landing</Link>
        </li>
      </ul>
    </nav>
  </header>
  {props.children}
</div>)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

const mapStateToProps = state => {
  debugger;
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
