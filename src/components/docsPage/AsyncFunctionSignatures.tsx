import { ISignature } from '@opencv4nodejs/docs/entities';
import * as React from 'react';

import { CodeLine } from './CodeLine';
import { FunctionBody } from './FunctionBody';

type Props = {
  signature: ISignature,
  fnName: string,
  returnTypeComponent: any
}
export class AsyncFunctionSignatures extends React.Component<Props> {

  render() {
    const { signature, fnName, returnTypeComponent } = this.props
    const sharedProps = { signature, fnName }

    return (
      <span>
        <CodeLine>
          <FunctionBody
            {...sharedProps}
          />
        </CodeLine>
        <CodeLine>
          <FunctionBody
            {...sharedProps}
            callbackResultComponent={
              <span>
                { returnTypeComponent }
                <span> {'res'} </span>
              </span>
            }
          />
        </CodeLine>
      </span>
    )
  }
}