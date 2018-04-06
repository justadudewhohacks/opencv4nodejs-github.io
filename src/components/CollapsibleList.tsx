import { ArrowDropDown, ArrowDropUp } from 'material-ui-icons';
import { ListItem } from 'material-ui/List';
import * as React from 'react';
import styled, { css, StyledComponentClass } from 'styled-components';

import { IndentedList } from './ApiTreeMenu/IndentedList';

const ListHeaderBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  >:first-child {
    flex: 1
  }
`

const overrideIconCss = css`
  && {
    padding: 4px;
    cursor: pointer;
  }
`

const StyledArrowDropDownIcon = styled(ArrowDropDown)`
  ${overrideIconCss}
`

const StyledArrowDropUpIcon = styled(ArrowDropUp)`
  ${overrideIconCss}
`

type ListHeaderProps = {
  headerContainer: StyledComponentClass<any, any, any>
  children: any
}

const ListHeader = ({ headerContainer, children } : ListHeaderProps) => {
  const Container = ListHeaderBase.withComponent(headerContainer)
  return (
    <Container>
      { children }
    </Container>
  )
}

type Props = {
  headerContainer: StyledComponentClass<any, any, any>
  renderHeaderComponent: () => JSX.Element
  isCollapsible?: boolean
}

type State = {
  collapsed: boolean
}

export class CollapsibleList extends React.Component<Props, State> {
  static defaultProps = {
    isCollapsible: true
  }

  constructor(props: Props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  state = {
    collapsed: false
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { renderHeaderComponent, headerContainer } = this.props
    return (
      <IndentedList>
        <ListItem
          component={() =>
            <ListHeader headerContainer={headerContainer}>
              { renderHeaderComponent() }
              {
                this.props.isCollapsible && (
                  this.state.collapsed
                    ? <StyledArrowDropDownIcon onClick={this.toggle}/>
                    : <StyledArrowDropUpIcon onClick={this.toggle}/>
                )
              }
            </ListHeader>
          }
        />
        {
          !this.state.collapsed && this.props.children
        }
      </IndentedList>
    )
  }
}