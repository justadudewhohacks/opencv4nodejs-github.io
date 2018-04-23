import * as React from 'react';
import Link from 'gatsby-link';

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any){
    super(props, context)
  }

  public render() {
    return(
      <div>
        <p>Welcome to <strong>{this.props.data.site.siteMetadata.siteName}</strong></p>
        <Link to='/opencv4nodejs/docs/Mat'> docs </Link>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery{
    site {
      siteMetadata {
        siteName
      }
    }
  }
`