import Link from 'gatsby-link';
import * as React from 'react';
import styled, { css } from 'styled-components';

import { CvModuleTree } from '../types';
import { CollapsibleList } from './CollapsibleList';

const listCss = css`
  list-style: none;
  margin: 0;
  padding: 0 0px;
`

const listItemCss = css`
  cursor: pointer;
  a {
    padding: 4px;
    color: inherit;
    text-decoration: none;
    display: block;
  }
`

const classListItemsCss = css`
  ${listCss}
  padding: 0 8px;
`

const classListHeaderCss = css`
  ${listItemCss}
  font-size: 18px;
  font-weight: bold;
`

const moduleListItemsCss = css`
  ${listCss}
`

const moduleListHeaderCss = css`
  ${listItemCss}
  padding: 4px;
  font-size: 18px;
  background: #424242;
  color: #fafafa;
`

const ClassHeader = styled.div`
  flex: 1;
`

const FunctionItem = styled.li`
  ${listItemCss}
`

const CategoryHeader = styled.li`
  ${listItemCss}
  margin-top: 5px;
  font-weight: bold;
  cursor: default;
`

const ApiTree = styled.ul`
  ${listCss}
  font-size: 14px;
  padding: 0;
  display: inline-block;
  background: #fafafa;
  overflow-y: auto;
`

const renderFunctionItem = (className: string, fnName: string) => (
  <FunctionItem key={fnName}>
    <Link  to={`/docs/${className}#${fnName}`}>
      { fnName }
    </Link>
  </FunctionItem>
)

const renderClassHeader = (className: string) => (
  <ClassHeader >
    <Link to={`/docs/${className}#${className}`}>
      { className }
    </Link>
  </ClassHeader>
)

type FunctionsListProps = {
  category: string
  className: string
  fnNames: string[]
}

const FunctionsList = ({ category, className, fnNames }: FunctionsListProps) => (
  <div>
    <CategoryHeader>
      { category === 'default' ? 'functions' : category }
    </CategoryHeader>
    {
      fnNames.map(fnName =>
        renderFunctionItem(className, fnName)
      )
    }
  </div>
)

type ClassListProps = {
  className: string
  isCollapsible: boolean
  children?: JSX.Element | JSX.Element[]
}

const ClassList = ({ className, isCollapsible, children }: ClassListProps) => (
  <CollapsibleList
    header=""
    renderHeaderText={() => renderClassHeader(className)}
    headerCss={classListHeaderCss}
    itemsCss={classListItemsCss}
    isCollapsible={isCollapsible}
  >
    { children  }
  </CollapsibleList>
)

type Props = {
  apiTree: CvModuleTree[]
}

export default class extends React.Component<Props> {
  render() {
    return (
      <ApiTree>
        {
          this.props.apiTree.map(({ cvModule, classTrees, cvFnNames }) => (
            <CollapsibleList
              header=""
              key={cvModule}
              renderHeaderText={() => cvModule}
              headerCss={moduleListHeaderCss}
              itemsCss={moduleListItemsCss}
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
                        .map(props => <FunctionsList {...props} />)
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
                    <FunctionsList
                      className="cv"
                      category="functions"
                      fnNames={cvFnNames}
                    />
                  </ClassList>
              }
            </CollapsibleList>
          ))
        }
      </ApiTree>
    )
  }
}