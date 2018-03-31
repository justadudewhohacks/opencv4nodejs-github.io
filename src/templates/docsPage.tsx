import * as React from 'react';

import Main from '../components/docsPage/Main'
import { Function } from '@opencv4nodejs/docs/entities';

type Props = {
  pathContext: {
    className: string,
    functions: Function[]
  }
}

export default class extends React.Component<Props, {}> {
  public render() {
    const { className, functions } = this.props.pathContext
    const mainProps = { className, functions, ...{ classes: [] } }
    return(
      <Main { ...mainProps } />
    )
  }
}