
const temp = document.createElement('template')
temp.innerHTML = `
<head>
  <link rel="stylesheet" href="../css/style.css">
</head>

<div class="container"></div>

<footer></footer>

<div>
<img id="memo" class = "imghover" src="Image/memory.png" />
</div>

<div>
<img id ="calc" class = "imghover" src="Image/calc.png" />
</div>

<div>
<img id ="chatt" class = "imghover" src="Image/chatt.png" />
</div>


`
const win = document.createElement('template')
win.innerHTML = `
<head>
  <link rel="stylesheet" href="../css/style.css">
</head>


<div class = 'appWindow' draggable = 'true'>
<div id = 'close' >+</div>
</div>

`

export { temp, win }
