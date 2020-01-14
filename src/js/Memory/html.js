'use strict'
const template = document.createElement('template')
template.innerHTML = `
<head>
  <link rel="stylesheet" href="../css/style.css">
</head>

<div id="Board">

</div>
`

const Pick = document.createElement('template')
Pick.innerHTML = `
<head>
  <link rel="stylesheet" href="../css/style.css">
</head>
<P class ='divHeader'>Memory</p>
<div id = 'remove'>
<button id = four >4X4</button>
<button id = two >2X2</button>
<button id = twoByfour >2X4</button>
</div>
`
export { template, Pick }
