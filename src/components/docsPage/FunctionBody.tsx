import { IArgument, IOptionalArgument } from '@opencv4nodejs/docs/entities';
import * as React from 'react';
import styled from 'styled-components';

import { Comma } from './Comma';
import { Declaration } from './Declaration';
import { joinComponents } from '../joinComponents';

export type IFunctionBodySignature = {
  requiredArgs: IArgument[]
  optionalArgs: IOptionalArgument[]
}

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

const Opts = () => <span> { '...opts' } </span>

const Callback = ({ resultComponent } : { resultComponent: any }) => (
  <FnBody fnName="callback">
    {
      joinComponents(
        [{ type: 'Error', name: 'err' }]
          .map(arg => <Declaration declaration={arg} />)
          .concat(resultComponent || []),
        () => <Comma />
      )
    }
  </FnBody>
)

const getAppendedComponents = (signature: IFunctionBodySignature, callbackResultComponent?: React.ReactElement<{}>) => (
  callbackResultComponent
    ? (
      (signature.optionalArgs.length ? [<Opts />] : [])
        .concat(<Callback resultComponent={callbackResultComponent} />)
    )
    : []
)

type Props = {
  signature: IFunctionBodySignature,
  fnName: string,
  callbackResultComponent?: React.ReactElement<{}>
}

export const FunctionBody = ({ signature, fnName, callbackResultComponent = null } : Props) => (
  <FnBody fnName={fnName}>
    {
      joinComponents(
        signature.requiredArgs
          .concat(signature.optionalArgs)
          .map(arg => <Declaration declaration={arg} />)
          .concat(getAppendedComponents(signature, callbackResultComponent)),
        () => <Comma />
      )
    }
  </FnBody>
)
