import { IArgument } from '@opencv4nodejs/docs/entities';
import * as React from 'react';

import { CodeLine } from './CodeLine';
import { Json } from './Json';
import { Result } from './Result';
import { Type } from './Type';
import { Colon } from './Colon';

type Props = {
  returnValues: IArgument[]
}

export const ResultAlias = ({ returnValues } : Props) =>
  !!returnValues.length && (
        returnValues.length > 1
          ?
            <Json
              fields={returnValues}
              typeComponent={<Result />}
            />
          :
            <CodeLine>
              <Result />
              <Colon />
              <Type {...returnValues[0]} />
            </CodeLine>
  )