import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Router, Location, navigate } from '@reach/router'
import { webFrame, ipcRenderer } from 'electron'
import posed, { PoseGroup } from 'react-pose'
import Titlebar from './components/Titlebar'
import Home from './screens/Home'
import Preferences from './screens/Preferences'
import './App.css'
import { defaultAnimation } from './components/Animations'

//
// Disable zooming
//
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

const Animation = posed.div(defaultAnimation)

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup animateOnMount>
        <Animation key={location.key}>
          <Router location={location}>{children}</Router>
        </Animation>
      </PoseGroup>
    )}
  </Location>
)

PosedRouter.propTypes = {
  children: PropTypes.any.isRequired
}

export default class App extends PureComponent {
  componentDidMount() {
    ipcRenderer.on('goTo', (evt, route) => {
      navigate(route)
    })
  }

  render() {
    return (
      <>
        <Titlebar />
        <div className="app">
          <PosedRouter>
            <Home path="/" default />
            <Preferences path="/preferences" />
          </PosedRouter>
        </div>
      </>
    )
  }
}
