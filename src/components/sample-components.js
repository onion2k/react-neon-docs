import React from 'react'
import PropTypes from 'prop-types'
import { rhythm } from '../utils/typography'

export const PureComponent = ({ text }) => (
  <div style={{ color: 'red', marginBottom: rhythm(1) }}>{text}</div>
)

PureComponent.propTypes = {
  text: PropTypes.string
}

// for react-live demo
export const componentClassExample = `
class Counter extends React.Component {
  constructor() {
    super()
    this.state = { count: 0 }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(state => ({ count: state.count + 1 }))
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return (
      <center>
        <h3 style={{marginTop: '6.5em'}}>
          {this.state.count}
        </h3>
      </center>
    )
  }
}
`.trim()

// for react-live demo
export const pfcExample = `
() => (
  <h3>
    So functional. Much wow!
  </h3>
)
`.trim()

export const jsxExample = `
<h3>
  Hello World!
</h3>
`.trim()

// for react-live demo
export const noInlineExample = `
const Wrapper = ({ children }) => (
  <div style={{
    background: 'papayawhip',
    width: '100%',
    padding: '2rem'
  }}>
    {children}
  </div>
)
const Title = () => (
  <h3 style={{ color: 'palevioletred' }}>
    Hello World!
  </h3>
)
render(
  <Wrapper>
    <Title />
  </Wrapper>
)
`.trim()
