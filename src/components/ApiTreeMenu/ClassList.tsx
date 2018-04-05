import * as React from 'react';
import styled from 'styled-components';

import { CollapsibleList } from '../CollapsibleList';
import { StyledLink } from './StyledLink';

const ClassHeader = styled.div`
  flex: 1;
`

const headerContainer = styled.div`
  font-size: 18px;
  font-weight: bold;
`

type Props = {
  className: string
  isCollapsible: boolean
  children?: JSX.Element | JSX.Element[]
}

export const ClassList = ({ className, isCollapsible, children }: Props) => (
  <CollapsibleList
    headerContainer={headerContainer}
    renderHeaderComponent={() =>
      <ClassHeader>
        <StyledLink to={`/docs/${className}#${className}`}>
          { className }
        </StyledLink>
      </ClassHeader>
    }
    isCollapsible={isCollapsible}
  >
    { children }
  </CollapsibleList>
)