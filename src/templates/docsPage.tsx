import * as React from 'react';

type Function = {
  fnName: string,
  signatures: string[]
}

type Props = {
  pathContext: {
    className: string,
    functions: Function[]
  }
}

export default class extends React.Component<Props, {}> {
  public render() {

    return(
      <div>
        <h1> { this.props.pathContext.className } </h1>
        { this.props.pathContext.functions.map(fn => <h3> { fn.fnName } </h3>) }
      </div>
    )
  }
}