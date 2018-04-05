import { IClass } from '@opencv4nodejs/docs/entities';
import * as React from 'react';

import { ConstructorsSection } from './ConstructorsSection';
import { Json } from './Json';
import { Type } from './Type';

type Props = {
  clazz: IClass
}

export const ClassSection = ({ clazz }: Props) => {
  const { className, fields, constructors } = clazz
  return (
    <div>
      {
        !!fields.length &&
          <span>
            <h3> { 'fields' } </h3>
            <Json
              fields={fields}
              typeComponent={<Type type={className} />}
            />
          </span>
      }
      {
        constructors.length ?
          <ConstructorsSection
            constructors={constructors}
          />
          : null
      }
    </div>
  )
}
