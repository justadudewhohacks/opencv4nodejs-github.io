import { ISignatureBody } from '@opencv4nodejs/docs/entities';
import * as React from 'react';
import styled from 'styled-components';

import { joinComponents } from '../joinComponents';
import { Comma } from './Comma';
import { Declaration } from './Declaration';

const FnName = styled.span`
  color: #6f42c1;
`

const FnBody = ({ fnName, children } : { fnName: string, children: any }) => (
  <span>
    { <FnName> { fnName } </FnName> }
    { '(' }
    { children }
    { ')' }
  </span>
)

const Opts = () => <span key={'opts'}> { '...opts' } </span>

const Callback = ({ resultComponent } : { resultComponent: any }) => (
  <FnBody fnName="callback">
    {
      joinComponents(
        [{ type: 'Error', name: 'err' }]
          .map(arg => <Declaration declaration={arg} key={arg.name} />)
          .concat(resultComponent || []),
        key => <Comma key={key} />
      )
    }
  </FnBody>
)

const getAppendedComponents = (signature: ISignatureBody, callbackResultComponent?: React.ReactElement<{}>) => (
  callbackResultComponent
    ? (
      (signature.optionalArgs.length ? [<Opts />] : [])
        .concat(<Callback resultComponent={callbackResultComponent} key={'callback'} />)
    )
    : []
)

type Props = {
  signature: ISignatureBody,
  fnName: string,
  callbackResultComponent?: React.ReactElement<{}>
}

export const FunctionBody = ({ signature, fnName, callbackResultComponent = null } : Props) => (
  <FnBody fnName={fnName}>
    {
      joinComponents(
        signature.requiredArgs
          .concat(signature.optionalArgs)
          .map(arg => <Declaration declaration={arg} key={arg.name} />)
          // TODO fix keys
          .concat(getAppendedComponents(signature, callbackResultComponent)),
        key => <Comma key={key} />
      )
    }
  </FnBody>
)
