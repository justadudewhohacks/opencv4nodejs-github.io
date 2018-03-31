import { IFunction } from '@opencv4nodejs/docs/entities';
import Link from 'gatsby-link';
import * as React from 'react';

import { FunctionSignatures } from './FunctionSignatures';

type Props = {
  functions: IFunction[]
  heading: string
  anchorHashPrefix?: string
}

export class FunctionsSection extends React.Component<Props> {
  render() {

    const { functions, heading, anchorHashPrefix = '' } = this.props

    return (
      <div>
        <h3> { heading } </h3>
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
                  .map(props => <FunctionSignatures { ...props } />)
              }
            </div>
          ))
        }
      </div>
    )
  }
}

