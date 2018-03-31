import { IClass, IFunction } from '@opencv4nodejs/docs/entities';
import * as React from 'react';
import styled from 'styled-components';

import { HLine } from '../HLine';
import { ClassSection } from './ClassSection';
import { FunctionsSection } from './FunctionsSection';
import { joinComponents } from '../joinComponents';

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
  className: string
  functions: IFunction[]
  classes: IClass[]
}

export default class extends React.Component<Props> {
  render() {
    const { className, classes, functions } = this.props
    return (
      <Container>
        {
          joinComponents(
            classes.map(clazz => <ClassSection cvClassWithFns={clazz} />),
            () => <HLine />
          )
        }
        <FunctionsSection
          functions={functions}
          heading={`${className} functions`}
        />
      </Container>
    )
  }
}
