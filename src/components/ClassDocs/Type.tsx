import * as React from 'react';
import styled from 'styled-components';

import { PrimitiveType } from './PrimitiveType';

const ClassType = styled.span`
  color: #005cc5;
  cursor: pointer;
`

const isClassType = (type: string) => (type && type[0].toUpperCase() === type[0])

const renderTypeOrClassType = (type: string) => (
  isClassType(type)
    ? <ClassType> { type } </ClassType>
    : <PrimitiveType> { type } </PrimitiveType>
)

export type TypeProps = {
  type: string,
  arrayDepth?: number,
  numArrayElements?: number
}

export const Type = ({ type, arrayDepth, numArrayElements } : TypeProps) =>
  <span>
    {
      renderTypeOrClassType(
        type
      )
    }
    {
      Array(arrayDepth || 0).fill(0).map(
        () => `[]`
      )
    }
  </span>
