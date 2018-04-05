import * as React from 'react';
import styled, { InterpolationValue } from 'styled-components';

const ToggleIcon = styled.i`
  padding: 4px;
`

type ListItemsProps = {
  css: any
}

const ListItems = styled.ul`
  ${(props: ListItemsProps) => props.css}
`

const HeaderText = styled.span`
  display: flex;
  align-items: center;
  flex: 1;
`

type ListHeaderProps = {
  css: any
}

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  ${(props: ListHeaderProps) => props.css}
`

type Props = {
  header: string
  itemsCss: InterpolationValue[] 
  headerCss: InterpolationValue[] 
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
          css={this.props.headerCss}
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
          this.state.collapsed ? null :
          <ListItems css={this.props.itemsCss}>
            { this.props.children }
          </ListItems>
        }
      </li>
    )
  }
}