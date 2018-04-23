import * as React from 'react';

let styles: string
if (process.env.NODE_ENV === `production`) {
  try {
    styles = require("!raw-loader!../public/styles.css")
  } catch (err) {
    console.log(err)
  }
}

interface HtmlProps {
  body: any
  postBodyComponents: any
  headComponents: any
}

module.exports = class extends React.Component<HtmlProps, void> {
  render() {
    const css = (process.env.NODE_ENV === `production`) ?
      <style
        id="gatsby-inlined-css"
        dangerouslySetInnerHTML={{ __html: styles }}
      />
      : null

    return (
      <html lang="en">
        <head>
          {this.props.headComponents}
          <title>opencv4nodejs</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          {css}
          <style dangerouslySetInnerHTML={{
            __html: 'html { font-family: \'Open Sans\', sans-serif; }'
          }} />
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}