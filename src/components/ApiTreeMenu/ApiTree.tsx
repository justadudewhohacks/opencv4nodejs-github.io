import { ListItem } from 'material-ui/List';
import * as React from 'react';
import styled from 'styled-components';

import { CvModuleTree } from '../../types';
import { CollapsibleList } from '../CollapsibleList';
import { ClassList } from './ClassList';
import { FunctionList } from './FunctionList';
import { IndentedList } from './IndentedList';

const headerContainer = styled.div`
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
          key={cvModule}
          headerContainer={headerContainer}
          renderHeaderComponent={() => cvModule}
        >
          <IndentedList>
            {
              classTrees.map(clazz =>
                <ListItem
                  key={clazz.className}
                  component={() =>
                    <ClassList
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
                          .map(props =>
                            <FunctionList
                              key={props.category}
                              {...props}
                            />
                          )
                      }
                    </ClassList>
                  }
                />
              )
            }
          </IndentedList>
          <IndentedList>
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
          </IndentedList>
        </CollapsibleList>
      ))
    }
  </Container>
)