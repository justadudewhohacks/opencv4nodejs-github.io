import Link from 'gatsby-link';
import * as React from 'react';
import styled from 'styled-components';

import { CollapsibleList } from '../CollapsibleList';
import { ListItem } from './ListItem';

const ClassHeader = styled.div`
  flex: 1;
`

const ClassItemsList = ListItem.extend`
  padding: 0 8px;
`

const HeaderContainer = ListItem.extend`
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
    header=""
    renderHeaderText={
      () =>
        <ClassHeader>
          <Link to={`/docs/${className}#${className}`}>
            { className }
          </Link>
        </ClassHeader>
    }
    headerContainer={HeaderContainer}
    isCollapsible={isCollapsible}
  >
    <ClassItemsList>
      { children }
    </ClassItemsList>
  </CollapsibleList>
)