import * as React from 'react'
import styled from 'styled-components'

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

export const SearchField = ({ value, onInputChanged } : Props) => (
  <div>
    <Container>
      <input
        value={value}
        onChange={e => onInputChanged(e.target.value)}
      />
      <i className="material-icons"> {'search'} </i>
    </Container>
  </div>
)