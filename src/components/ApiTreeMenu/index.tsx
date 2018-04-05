import * as React from 'react';
import styled from 'styled-components';

import { CvModuleTree } from '../../types';
import { SearchField } from '../SearchField';
import { ApiTree } from './ApiTree';

function getFilteredTree(apiTree: CvModuleTree[], filter: string) : CvModuleTree[] {
  if (!filter) {
    return apiTree
  }

  const nameIncludes = (name: string) => name.toLowerCase().includes(filter.toLowerCase())
  const isNotEmpty = (arr: any[]) => !!arr.length

  return apiTree.map(
    moduleTree => ({
      ...moduleTree,
      classTrees: moduleTree.classTrees
        .map(classTree => ({
          ...classTree,
          fnNamesWithCategory: classTree.fnNamesWithCategory
            .map(({ category, fnNames }) => ({
              category,
              fnNames: fnNames.filter(nameIncludes)
            }))
            .filter(({ fnNames }) => isNotEmpty(fnNames))
        }))
        .filter(classTree => nameIncludes(classTree.className)
          || isNotEmpty(classTree.fnNamesWithCategory)
        ),
      cvFnNames: moduleTree.cvFnNames.filter(fnName => nameIncludes(fnName))
    })
  )
}

type MenuProps = {
  translateX: number
}

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 260px;
  max-width: 260px;
  overflow-x: hidden;
  background: #fafafa;
  z-index: 1;
  transition: transform 100ms ease-out;
  transform: translate(${(props: MenuProps) => props.translateX}px);
  @media (max-width: 780px) {
    position: absolute;
    left: 0;
  }
`

type Props = {
  apiTree: CvModuleTree[]
  menuTranslateX: number
}

type State = {
  filter: string
}

export class ApiTreeMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.updateFilter = this.updateFilter.bind(this)
    this.beforePageTransition = this.beforePageTransition.bind(this)
  }

  state = {
    filter: ''
  }

  apiTreeRef: any = null

  updateFilter(filter: string) {
    this.setState({ filter })
  }

  beforePageTransition() {
    if (!this.apiTreeRef)
      return

    localStorage.setItem('apiTreeMenuScroll', this.apiTreeRef.scrollTop)
  }

  componentDidMount() {
    if (!this.apiTreeRef)
      return

    const scrollTop = localStorage.getItem('apiTreeMenuScroll')
    this.apiTreeRef.scrollTo(0, scrollTop)
  }

  render() {
    return (
      <Menu translateX={this.props.menuTranslateX}>
        <SearchField
          value={this.state.filter}
          onInputChanged={this.updateFilter}
        />
        <ApiTree
          apiTree={getFilteredTree(this.props.apiTree, this.state.filter)}
          onLinkClicked={this.beforePageTransition}
          onApiTreeRef={(ref) => { this.apiTreeRef = ref }}
        />
      </Menu>
    )
  }
}