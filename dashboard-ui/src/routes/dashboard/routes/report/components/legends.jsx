import React from 'react'
import PropTypes from "prop-types"
import {translate, Trans} from "react-i18next"

class Legends extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {legendVisible: true};
  }

  onToggleLegend(){
    this.setState({legendVisible: !this.state.legendVisible})
  }

  render() {
    const {legendVisible} = this.state
    return (
      <div className="legend-box">
        <div className="legend-header">
          <div className="legend-title"><Trans>Legend</Trans></div>
          <div className={legendVisible ? 'legend-toggle-colapse' : 'legend-toggle-expand'} onClick={this.onToggleLegend.bind(this)}></div>
        </div>
        {legendVisible ? 
          this.props.children
        : null}
      </div>
    )
  }
}

export default translate("translations")(Legends)
