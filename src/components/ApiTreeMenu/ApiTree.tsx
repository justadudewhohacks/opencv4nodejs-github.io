import * as React from 'react';
import styled from 'styled-components';

import { CvModuleTree } from '../../types';
import { CollapsibleList } from '../CollapsibleList';
import { ClassList } from './ClassList';
import { FunctionList } from './FunctionList';
import { ListItem } from './ListItem';

const ModuleHeaderContainer = ListItem.extend`
  padding: 4px;
  font-size: 18px;
  background: #424242;
  color: #fafafa;
`

const Container = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0px;
  font-size: 14px;
  padding: 0;
  display: inline-block;
  background: #fafafa;
  overflow-y: auto;
`

type Props = {
  apiTree: CvModuleTree[]
}

export const ApiTree = ({ apiTree }: Props) => (
  <Container>
    {
      apiTree.map(({ cvModule, classTrees, cvFnNames }) => (
        <CollapsibleList
          header=""
          key={cvModule}
          renderHeaderText={() => cvModule}
          headerContainer={ModuleHeaderContainer}
        >
          {
            classTrees.map(clazz =>
              <ClassList
                key={clazz.className}
                className={clazz.className}
                isCollapsible={clazz.fnNamesWithCategory.reduce((numFns, { fnNames }) => numFns + fnNames.length, 0) > 5}
              >
                {
                  clazz.fnNamesWithCategory
                    .map(({ category, fnNames }) => ({
                      category: (category === 'default' ? 'functions' : category),
                      className: clazz.className,
                      fnNames
                    }))
                    .map(props => <FunctionList {...props} />)
                }
              </ClassList>
            )
          }
          {
            !!cvFnNames.length &&
              <ClassList
                key="cv"
                className="cv"
                isCollapsible={cvFnNames.length > 5}
              >
                <FunctionList
                  className="cv"
                  category="functions"
                  fnNames={cvFnNames}
                />
              </ClassList>
          }
        </CollapsibleList>
      ))
    }
  </Container>
)