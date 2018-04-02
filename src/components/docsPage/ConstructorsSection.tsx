import * as React from 'react';

import { Code } from './Code';
import { CodeLine } from './CodeLine';
import { FunctionBody, IFunctionBodySignature } from './FunctionBody';

type Props = {
  constructors: (IFunctionBodySignature & { returnsOther: string })[]
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
