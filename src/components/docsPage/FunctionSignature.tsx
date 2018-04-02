import { ISignature } from '@opencv4nodejs/docs/entities';
import * as React from 'react';

import { AsyncFunctionSignatures } from './AsyncFunctionSignatures';
import { Code } from './Code';
import { CodeLine } from './CodeLine';
import { Colon } from './Colon';
import { FunctionBody } from './FunctionBody';
import { Result } from './Result';
import { ResultAlias } from './ResultAlias';

type Props = {
  signature: ISignature,
  fnName: string,
  hasAsync: boolean
}

export class FunctionSignature extends React.Component<Props> {

  render() {

    const { signature, fnName, hasAsync } = this.props
    const { returnValues } = signature

    const syncFunctionSignatureProps = {
      signature,
      fnName
    }

    const asyncFunctionSignaturesProps = {
      signature,
      fnName: `${fnName}Async`
    }

    return (
      <Code>
        <ResultAlias
          returnValues={returnValues}
        />
        <CodeLine>
          <FunctionBody {...syncFunctionSignatureProps} />
          <Colon />
          <Result />
        </CodeLine>
        {
          hasAsync
            ? <AsyncFunctionSignatures {...asyncFunctionSignaturesProps} />
            : null
        }
      </Code>
    )
  }
}
