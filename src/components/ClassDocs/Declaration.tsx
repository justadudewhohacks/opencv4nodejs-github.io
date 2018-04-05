import { IDeclaration } from '@opencv4nodejs/docs/entities';
import * as React from 'react';
import styled from 'styled-components';

import { Type } from './Type';
import { Colon } from './Colon';


const ParamName = styled.span`
`

const Constant = styled.span`
  color: #005cc5;
`

type Props = {
  declaration: IDeclaration
}

export const Declaration = ({ declaration }: Props) => {
  const { name, defaultValue } = declaration
  return (
    <span>
      { <ParamName> { name } </ParamName> }
      <Colon />
      <Type {...declaration} />
      { defaultValue !== undefined ? <span> { ' = ' } </span> : null }
      { defaultValue !== undefined ? <Constant> { defaultValue } </Constant> : null }
    </span>
  )
}
