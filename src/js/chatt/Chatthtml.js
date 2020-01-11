'use strict'
const chattHTML = document.createElement('template')
chattHTML.innerHTML = `
<head>
  <link rel="stylesheet" href="../css/style.css">
</head>
<P class ='divHeader'>CHATT</p>
<div class = 'chatt'>
<div class = 'messages' >

<template>
<div class = 'message'  > 
<p class = 'author' > </p>
<p class = 'text' </p> 
</div>
</template>
</div>
<textarea class = 'textmassage' ></textarea>
</div>

<input id='username' placeholder = 'Användare' type='text'></input>
<Button id='sendUser' >Spara</Button>
`

export default chattHTML
