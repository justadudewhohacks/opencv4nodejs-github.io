import Link from 'gatsby-link';
import * as React from 'react';

import { ListItem } from './ListItem';

const CategoryHeader = ListItem.extend`
  margin-top: 5px;
  font-weight: bold;
  cursor: default;
`

type Props = {
  category: string
  className: string
  fnNames: string[]
}

export const FunctionList = ({ category, className, fnNames }: Props) => (
  <div>
    <CategoryHeader>
      { category === 'default' ? 'functions' : category }
    </CategoryHeader>
    {
      fnNames
        .map(fnName =>
          <ListItem>
            <Link to={`/docs/${className}#${fnName}`}>
              { fnName }
            </Link>
          </ListItem>
        )
    }
  </div>
)