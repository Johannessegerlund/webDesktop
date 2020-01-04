'use strict'
const calcHTML = document.createElement('template')
calcHTML.innerHTML = `
<head>
  <link rel="stylesheet" href="../css/style.css">
</head>

<div class = "Calc" >


<div class="output">
      <div class="previous"></div>
      <div class="current"></div>
    </div>

<button class = 'AC'>AC</button>
<button class = 'del'>Del</button>
<button class = 'dec'>.</button>
<button class = 'operation'>/</button>  
<button class ='number'>1</button>  
<button class ='number'>2</button>
<button class ='number'>3</button>
<button class = 'operation'>+</button>
<button class ='number'>4</button>
<button class ='number'>5</button>
<button class ='number'>6</button>
<button class = 'operation'>*</button>
<button class ='number'>7</button>
<button class ='number'>8</button>
<button class ='number'>9</button>
<button class = 'operation'>-</button>
<button class ='number'>0</button>
<button class = 'equal'>=</button
</div>
`

export default calcHTML
