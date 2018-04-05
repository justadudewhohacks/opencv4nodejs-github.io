import { ListItem } from 'material-ui/List';
import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

import { IndentedList } from './ApiTreeMenu/IndentedList';

const ToggleIcon = styled.i`
  padding: 4px;
`

const ListHeaderBase = styled.div`
  display: flex;
  align-items: center;
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
  renderHeaderComponent: () => JSX.Element | string
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
                this.props.isCollapsible
                ? (
                  <ToggleIcon
                    onClick={this.toggle}
                  >
                    {this.state.collapsed ? '+' : '-'}
                  </ToggleIcon>
                )
                : null
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