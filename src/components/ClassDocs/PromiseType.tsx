import * as React from 'react';
import styled from 'styled-components';

import { PrimitiveType } from './PrimitiveType';

const CompactText = styled.span`
  display: inline-flex;
`

type Props = {
  children: React.ReactChild
}

export const PromiseType = ({ children } : Props) => (
  <CompactText>
    <PrimitiveType> { 'Promise' } </PrimitiveType>
    { '<' }
    { children }
    { '>' }
  </CompactText>
)
