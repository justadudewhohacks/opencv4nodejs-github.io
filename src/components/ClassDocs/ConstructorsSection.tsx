import { IConstructor } from '@opencv4nodejs/docs/entities';
import * as React from 'react';

import { Code } from './Code';
import { CodeLine } from './CodeLine';
import { FunctionBody } from './FunctionBody';

type Props = {
  constructors: IConstructor[]
}

export const ConstructorsSection = ({ constructors } : Props) => (
  <div>
    <h3> { 'constructors' } </h3>
    {
      constructors.map(c => (
        <Code>
          <CodeLine>
            <FunctionBody
              signature={c}
              fnName="constructor"
            />
          </CodeLine>
        </Code>
      ))
    }
  </div>
)
