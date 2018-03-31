import * as React from 'react';

export function joinComponents(
  components: React.ReactElement<{}>[],
  renderJoiningComponent: () => React.ReactElement<{}>,
): React.ReactElement<{}>[] {
  return components.reduce(
    function (
      all: React.ReactElement<{}>[],
      component: React.ReactElement<{}>,
      i: number
    ) {
      return all.concat(
        i < (components.length - 1)
          ? [component, renderJoiningComponent()]
          : component
      )
    },
    []
  )
}