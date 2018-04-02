import { IFunction } from '@opencv4nodejs/docs/entities';
import Link from 'gatsby-link';
import * as React from 'react';

import { FunctionSignature } from './FunctionSignature';

type Props = {
  functions: IFunction[]
  anchorHashPrefix?: string
}

export class FunctionsSection extends React.Component<Props> {
  render() {
    const { functions, anchorHashPrefix = '' } = this.props

    if (!functions.length)
      return null

    return (
      <div>
        <h3> { 'functions' } </h3>
        {
          functions.map(fn => (
            <div key={fn.fnName}>
              <Link to={`${anchorHashPrefix}${fn.fnName}`} />
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

