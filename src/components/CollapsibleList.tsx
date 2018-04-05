import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

const ToggleIcon = styled.i`
  padding: 4px;
`

const HeaderText = styled.span`
  display: flex;
  align-items: center;
  flex: 1;
`


type ListHeaderProps = {
  headerContainer: StyledComponentClass<any, any, any>
  children: JSX.Element | JSX.Element[]
}

const ListHeader = ({ headerContainer, children } : ListHeaderProps) => {
  const Container = headerContainer.extend`
    display: flex;
    align-items: center;
  `

  return (
    <Container>
      { children }
    </Container>
  )
}

type Props = {
  header: string
  headerContainer: StyledComponentClass<any, any, any>
  renderHeaderText: () => any
  onClickHeaderText?: () => any
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

  render() : any {
    const { header, renderHeaderText } = this.props
    return (
      <li key={header}>
        <ListHeader
          headerContainer={this.props.headerContainer}
        >
          <HeaderText
            onClick={this.props.onClickHeaderText || (() => {})}
          >
            { renderHeaderText() }
          </HeaderText>
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
        {
          !this.state.collapsed && this.props.children
        }
      </li>
    )
  }
}