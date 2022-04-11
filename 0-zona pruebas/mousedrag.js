// Make the DIV element draggable:
dragElement(document.getElementById("carrier"));
dragElement(document.getElementById("submarine"));


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        let offsetLeft = elmnt.offsetLeft - pos1;
        if(offsetLeft < 200) offsetLeft = 200;
        if(offsetLeft > 900) offsetLeft = 900;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (offsetLeft) + "px";
    }

  function closeDragElement() {
      console.log("X:"+pos3+" Y:"+pos4);
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}