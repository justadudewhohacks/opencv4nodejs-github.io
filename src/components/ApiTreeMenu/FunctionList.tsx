import { ListItem } from 'material-ui/List';
import * as React from 'react';
import styled from 'styled-components';

import { IndentedList } from './IndentedList';
import { StyledLink } from './StyledLink';

const CategoryHeader = styled.div`
  font-weight: bold;
  cursor: default;
`

type Props = {
  category: string
  className: string
  fnNames: string[]
}

export const FunctionList = ({ category, className, fnNames }: Props) => (
  <IndentedList>
    <ListItem
      dense
      key={'header'}
      component={() =>
        <CategoryHeader>
          { category === 'default' ? 'functions' : category }
        </CategoryHeader>
      }
    />
    {
      fnNames
        .map(fnName =>
          <ListItem
            key={fnName}
            dense
            component={() =>
              <StyledLink to={`/docs/${className}#${fnName}`}>
                { fnName }
              </StyledLink>
            }
          />
        )
    }
  </IndentedList>
)