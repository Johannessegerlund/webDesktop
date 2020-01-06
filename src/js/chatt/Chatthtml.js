'use strict'
const chattHTML = document.createElement('template')
chattHTML.innerHTML = `
<head>
  <link rel="stylesheet" href="../css/style.css">
</head>

<div class = 'chatt'>
<div class = 'messages' >

<template>
<div class = 'message' > 
<p class = 'text' </p> 
<p class = 'author' > </p>
</div>
</template>
</div>
<textarea class = 'textmassage'></textarea>
</div>
`

export default chattHTML
