import React, {PropTypes} from 'react'

export default class Component extends React.Component {
  static propTypes = {
    /**
     * Description of prop "foo".
     */
    foo: React.PropTypes.number,
    /**
     * Description of prop "bar" (a custom validation function).
     */
    bar: function (props, propName, componentName) {
      // ...
    },
    baz: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])
  }

  static defaultProps = {
      foo: 42,
      bar: 21
  }

  render() {
    // ...
  }
}