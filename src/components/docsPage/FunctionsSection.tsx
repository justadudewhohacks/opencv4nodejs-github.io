import { IFunction } from '@opencv4nodejs/docs/entities';
import * as React from 'react';

import { FunctionSignature } from './FunctionSignature';

type Props = {
  functions: IFunction[]
}

export class FunctionsSection extends React.Component<Props> {
  render() {
    const { functions } = this.props

    if (!functions.length)
      return null

    return (
      <div>
        <h3> { 'functions' } </h3>
        {
          functions.map(fn => (
            <div key={fn.fnName}>
              <a id={`${fn.fnName}`} />
              <h4> {fn.fnName} </h4>
              {
                fn.signatures
                  .map((signature) => {
                    const { fnName, hasAsync } = fn
                    return { fnName, hasAsync, signature }
                  })
                  .map(props => <FunctionSignature { ...props } />)
              }
            </div>
          ))
        }
      </div>
    )
  }
}

