import { ListItem } from 'material-ui/List';
import * as React from 'react';
import styled, { css, StyledComponentClass } from 'styled-components';

import { IndentedList } from './ApiTreeMenu/IndentedList';
import { Icon } from 'material-ui';

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

const StyledIcon = styled(Icon)`
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
                    ? <StyledIcon onClick={this.toggle}> arrow_drop_up </StyledIcon>
                    : <StyledIcon onClick={this.toggle}> arrow_drop_down </StyledIcon>
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