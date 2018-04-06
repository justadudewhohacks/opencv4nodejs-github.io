import * as React from 'react';
import styled from 'styled-components';

import { CollapsibleList } from '../CollapsibleList';
import { StyledLink } from './StyledLink';

const headerContainer = styled.div`
  font-size: 18px;
  font-weight: bold;
`

type Props = {
  className: string
  isCollapsible: boolean
  onLinkClicked: () => void
  children?: JSX.Element | JSX.Element[]
}

export const ClassList = ({ className, isCollapsible, onLinkClicked, children }: Props) => (
  <CollapsibleList
    headerContainer={headerContainer}
    renderHeaderComponent={() =>
      <StyledLink
        onClick={onLinkClicked}
        to={`/docs/${className}#${className}`}
      >
        { className }
      </StyledLink>
    }
    isCollapsible={isCollapsible}
  >
    { children }
  </CollapsibleList>
)