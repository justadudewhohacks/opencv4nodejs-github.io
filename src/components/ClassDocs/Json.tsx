import { IDeclaration } from '@opencv4nodejs/docs/entities';
import * as React from 'react';
import styled from 'styled-components';

import { Code } from './Code';
import { CodeLine } from './CodeLine';
import { Comma } from './Comma';
import { Declaration } from './Declaration';

const Indent = styled.span`
  padding: 0 4px;
`

type Props = {
  fields: Array<IDeclaration>,
  typeComponent: React.ReactElement<{}>
}

export const Json = ({ fields, typeComponent } : Props) => (
  <Code>
    <CodeLine>
      { typeComponent }
      { ' = {' }
    </CodeLine>
    {
      fields
        .map((field, i) => (
          <CodeLine key={field.name}>
            <Indent />
            <Declaration declaration={field} />
            {
              (i < (fields.length - 1)) &&
                <Comma />
            }
          </CodeLine>
        ))
    }
    <CodeLine>
      { '}' }
    </CodeLine>
  </Code>
)
