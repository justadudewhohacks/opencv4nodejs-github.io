import styled from 'styled-components';

type Props = {
  noPadding?: boolean
  marginBottom?: string
}

export const CodeLine = styled.div`
  padding: ${(props: Props) => (props.noPadding ? 0 : 5)}px;
  white-space: nowrap;
  margin-bottom: ${(props: Props) => props.marginBottom || 0};
`
