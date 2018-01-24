import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { test: 'foo' }
    this.bar = this.bar.bind(this)
  }

  bar() {
    this.baz()
  }

  render() {
    return (
      <div className="app">
        <button className="button" onClick={this.bar}>
          bar
        </button>
        <div>
          <a href="/error">Backend error</a>
        </div>
        <div>
          <a href="/other">Other</a>
        </div>
        <div>
          <a href="/dolog">Do log</a>
        </div>
      </div>
    )
  }
}
