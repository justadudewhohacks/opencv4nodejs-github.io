import * as React from 'react'
import styled from 'styled-components'
import { Icon } from 'material-ui';

type Props = {
  value: string,
  onInputChanged: (value: string) => any
}

const Container = styled.div`
  display: flex;
  padding: 5px;
  input {
    flex: 1;
  }
  i {
    margin-left: 5px;
    cursor: pointer;
  }
`

const StyledIcon = styled(Icon)`
  && {
    padding: 4px;
  }
`

export const SearchField = ({ value, onInputChanged } : Props) => (
  <div>
    <Container>
      <input
        value={value}
        onChange={e => onInputChanged(e.target.value)}
      />
      <StyledIcon>
        search
      </StyledIcon>
    </Container>
  </div>
)