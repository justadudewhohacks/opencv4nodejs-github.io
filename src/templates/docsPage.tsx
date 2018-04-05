import { IClass, IFunction } from '@opencv4nodejs/docs/entities';
import * as React from 'react';
import styled from 'styled-components';

import ApiTree from '../components/ApiTree';
import Main from '../components/DocsPage/Main';
import { CvModuleTree } from '../types';
import { SearchField } from '../components/SearchFields';

const PageWrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;
`

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
  left: 0;
  right: 0;
`

const Navbar = styled.div`
`

const MainContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const MenuIcon = styled.i`
  font-size: 32px;
  padding: 4px;
  margin-right: 4px;
  cursor: pointer;
  display: none;
  @media (max-width: 780px) {
    display: inherit;
  }
`

const ContentHeader = styled.div`
  position: relative;
  font-size: 24px;
  background: #424242;
  color: #ffffff;
  padding: 4px;
  display: flex;
  align-items: center;
`

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
  pathContext: {
    clazz?: IClass,
    functions: IFunction[]
    apiTree: CvModuleTree[]
  }
}

type State = {
  isMenuVisible: boolean
  isMobileView: boolean
  filter: string
}

const maxMobileWidth = 780

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.onWindowResized = this.onWindowResized.bind(this)
    this.onApiTreeLinkClicked = this.onApiTreeLinkClicked.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
    this.getFilteredTree = this.getFilteredTree.bind(this)
  }

  state = {
    isMenuVisible: true,
    isMobileView: false,
    filter: ''
  }

  componentDidMount() {
    this.onWindowResized();
    window.addEventListener('resize', this.onWindowResized);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResized);
  }

  onWindowResized() {
    if (!this.state.isMobileView && window.innerWidth < maxMobileWidth) {
      this.setState({
        isMobileView: true,
        isMenuVisible: false
      })
    }

    if (this.state.isMobileView && maxMobileWidth <= window.innerWidth) {
      this.setState({
        isMobileView: false
      })
    }
  }

  onApiTreeLinkClicked() {
    if (this.state.isMobileView) {
      this.toggleMenu()
    }
  }

  toggleMenu() {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  }

  updateFilter(filter: string) {
    this.setState({ filter })
  }

  getFilteredTree(apiTree: CvModuleTree[]) : CvModuleTree[] {
    const { filter } = this.state
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

  public render() {
    const { clazz = null, functions, apiTree } = this.props.pathContext
    const mainProps = { clazz, functions }
    const apiTreeProps = { apiTree: this.getFilteredTree(apiTree) }

    return(
      <PageWrapper>
        <PageContainer>
          <Navbar>
            <MenuIcon
              className="material-icons"
              onClick={this.toggleMenu}
            >
              { 'menu' }
            </MenuIcon>
          </Navbar>
          <MainContainer>
            <Menu translateX={this.state.isMenuVisible || !this.state.isMobileView ? 0 : -260}>
              <SearchField
                value={this.state.filter}
                onInputChanged={this.updateFilter}
              />
              <ApiTree 
                {...apiTreeProps}
              />
            </Menu>
            <Content>
              <div>
                <ContentHeader>
                  <span> { clazz ? clazz.cvModule : 'cv' } </span>
                </ContentHeader>
              </div>
              <Main { ...mainProps } />
            </Content>
          </MainContainer>
        </PageContainer>
      </PageWrapper>
    )
  }
}