import { ISignature } from '@opencv4nodejs/docs/entities';
import * as React from 'react';

import { CodeLine } from './CodeLine';
import { Colon } from './Colon';
import { FunctionBody } from './FunctionBody';
import { Void } from './Void';
import { PromiseType } from './PromiseType';
import { Result } from './Result';

type Props = {
  signature: ISignature,
  fnName: string
}
export class AsyncFunctionSignatures extends React.Component<Props> {

  render() {
    const { signature, fnName } = this.props
    const sharedProps = { signature, fnName }

    return (
      <span>
        <CodeLine>
          <FunctionBody
            {...sharedProps}
          />
          <Colon />
          <PromiseType>
            <Result />
          </PromiseType>
        </CodeLine>
        <CodeLine>
          <FunctionBody
            {...sharedProps}
            callbackResultComponent={
              <span>
                <Result />
                <span> {'res'} </span>
              </span>
            }
          />
          <Colon />
          <Void />
        </CodeLine>
      </span>
    )
  }
}