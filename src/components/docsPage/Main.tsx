import { IClass, IFunction } from '@opencv4nodejs/docs/entities';
import Link from 'gatsby-link';
import * as React from 'react';
import styled from 'styled-components';

import { ClassSection } from './ClassSection';
import { FunctionsSection } from './FunctionsSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
`

type Props = {
  functions: IFunction[]
  clazz: IClass | null
}

export default class extends React.Component<Props> {
  render() {
    const { clazz, functions } = this.props
    const className = clazz ? clazz.className : 'cv'
    return (
      <Container>
        <Link to={className} />
        <h2> { `${className}` } </h2>
        {
          clazz &&
            <ClassSection
              clazz={clazz}
            />
        }
        <FunctionsSection
          functions={functions}
        />
      </Container>
    )
  }
}
