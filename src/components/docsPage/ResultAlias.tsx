import { IArgument } from '@opencv4nodejs/docs/entities';
import * as React from 'react';
import styled from 'styled-components';

import { CodeLine } from './CodeLine';
import { Comma } from './Comma';
import { Declaration } from './Declaration';
import { Result } from './Result';
import { joinComponents } from '../joinComponents';

const Highlighted = styled.div`
  background: #f0f0f0;
  display: inline;
  padding: 5px;
`

type Props = {
  returnValues: IArgument[]
}

export const ResultAlias = ({ returnValues } : Props) => (
  <CodeLine
    marginBottom="5px"
    noPadding
  >
    <Highlighted>
      <Result />
      { ' = ' }
      { '{' }
      {
        joinComponents(
          returnValues.map(ret => <Declaration declaration={ret} />),
          () => <Comma />
        )
      }
      { '}' }
    </Highlighted>
  </CodeLine>
)
