import { ISignature } from '@opencv4nodejs/docs/entities';
import * as React from 'react';
import styled from 'styled-components';

import { AsyncFunctionSignatures } from './AsyncFunctionSignatures';
import { Code } from './Code';
import { CodeLine } from './CodeLine';
import { Colon } from './Colon';
import { FunctionBody } from './FunctionBody';
import { PromiseType } from './PromiseType';
import { Result } from './Result';
import { ResultAlias } from './ResultAlias';
import { Type } from './Type';
import { Void } from './Void';

type Props = {
  signature: ISignature,
  fnName: string,
  hasAsync: boolean
}

const FlexContainer = styled.div`
  display: flex;
`

const ReturnValue = styled.span`
  display: flex;
  justify-content: space-between;
`

export class FunctionSignatures extends React.Component<Props> {

  render() {

    const { signature, fnName, hasAsync } = this.props
    const { returnValues } = signature
    const hasReturnVal = returnValues && returnValues.length
    const useResultAlias = hasReturnVal && returnValues.length > 1

    const returnTypeComponent = (
      !hasReturnVal
        ? <Void />
        : useResultAlias
          ? <Result />
          : <Type {...returnValues[0]} />
    )

    const syncFunctionSignatureProps = {
      signature,
      fnName
    }

    const asyncFunctionSignaturesProps = {
      signature,
      fnName: `${fnName}Async`,
      returnTypeComponent
    }

    return (
      <Code>
        {
          useResultAlias
            ? <ResultAlias returnValues={returnValues} />
            : null
        }
        <FlexContainer>
          <div>
            <CodeLine>
              {
                <ReturnValue>
                  { returnTypeComponent }
                  <Colon />
                </ReturnValue>
              }
            </CodeLine>
            {
              hasAsync
              ? ([
                <CodeLine>
                  <ReturnValue>
                    <PromiseType>
                      { returnTypeComponent }
                    </PromiseType>
                    <Colon />
                  </ReturnValue>
                </CodeLine>,
                <CodeLine>
                  {
                    <ReturnValue>
                      <Void />
                      <Colon />
                    </ReturnValue>
                  }
                </CodeLine>
              ]) : null
            }
          </div>
          <div>
            <CodeLine>
              <FunctionBody {...syncFunctionSignatureProps} />
            </CodeLine>
            {
              hasAsync
                ? <AsyncFunctionSignatures {...asyncFunctionSignaturesProps} />
                : null
            }
          </div>
        </FlexContainer>
      </Code>
    )
  }
}
