import { IClass, IFunction } from '@opencv4nodejs/docs/entities';
import * as React from 'react';

import Main from '../components/docsPage/Main';

type Props = {
  pathContext: {
    clazz: IClass,
    functions: IFunction[]
  }
}

export default class extends React.Component<Props, {}> {
  public render() {
    const { clazz, functions } = this.props.pathContext
    const mainProps = { clazz, functions }
    return(
      <Main { ...mainProps } />
    )
  }
}