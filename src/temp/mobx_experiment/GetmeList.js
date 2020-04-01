/* eslint react/prop-types: 0 */

import React from 'react'
import { observer } from 'mobx-react'
import { Typography } from '@material-ui/core';

async function GetmeList({ uiState: { getmeData } }) {
  await when(() => getmeData.isVisible)
  const { data } = getmeData;
  if ( !data || !data.me || !data.me.length ) {
    return <div>No data for you bruh.</div>
  }

  const { getme } = data
  return (
    <Typography variant="body2">
      {getme.map(me =>
      {me.phone}
      )}
    </Typography>
  )
}

export default observer(GetmeList)
