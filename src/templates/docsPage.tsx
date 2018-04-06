import { IClass, IFunction } from '@opencv4nodejs/docs/entities';
import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import styled from 'styled-components';
import { Menu } from 'material-ui-icons';

import { ApiTreeMenu } from '../components/ApiTreeMenu';
import { ClassDocs } from '../components/ClassDocs';
import { CvModuleTree } from '../types';

const getPageContext = require('./getPageContext')

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

const StyledMenuIcon = styled(Menu)`
  && {
    font-size: 32px;
    padding: 4px;
    margin-right: 4px;
    cursor: pointer;
    display: none;
    @media (max-width: 780px) {
      display: inherit;
    }
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
}

const maxMobileWidth = 780

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.onWindowResized = this.onWindowResized.bind(this)
    this.onApiTreeLinkClicked = this.onApiTreeLinkClicked.bind(this)

    this.pageContext = getPageContext();
  }

  pageContext: any = {}

  state = {
    isMenuVisible: true,
    isMobileView: false
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

  public render() {
    const { clazz = null, functions, apiTree } = this.props.pathContext
    const classDocsProps = { clazz, functions }
    const apiTreeMenuProps = {
      apiTree,
      menuTranslateX: (this.state.isMenuVisible || !this.state.isMobileView ? 0 : -260)
    }

    return(
      <MuiThemeProvider
        theme={this.pageContext.theme}
        sheetsManager={this.pageContext.sheetsManager}
      >
        <PageWrapper>
          <PageContainer>
            <Navbar>
              <StyledMenuIcon onClick={this.toggleMenu} />
            </Navbar>
            <MainContainer>
              <ApiTreeMenu {...apiTreeMenuProps}/>
              <Content>
                <div>
                  <ContentHeader>
                    <span> { clazz ? clazz.cvModule : 'cv' } </span>
                  </ContentHeader>
                </div>
                <ClassDocs { ...classDocsProps } />
              </Content>
            </MainContainer>
          </PageContainer>
        </PageWrapper>
      </MuiThemeProvider>
    )
  }
}