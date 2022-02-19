		//Drop me a line 
document.addEventListener("DOMContentLoaded", function(event) { 
interact.dynamicDrop(true);
interact('#green-line').draggable({
    restrict: {
     restriction: "parent",/*set boundaries for the element to return back to the parent when the draggable event ended*/
     endOnly: true,/*if false, the element can be dragged only in the restricted area, if true - the element can be dragged anywhere but will return to the restricted area at the end of the dragging*/
     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    onmove: dragMoveListener
  }).styleCursor(false);

function dragMoveListener (event) {
    var target = event.target; /*gets the element on which the event originally occurred*/
    // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x'))|| 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
   // translate the element
   // target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
		var outer = document.getElementById('outer-zone');
		var inner = document.getElementById('inner-zone');
		interact('.same-zones').dropzone({
			// only accept elements matching this CSS selector
			accept: '#green-line',
			// Require a 1% element overlap for a drop to be possible
			overlap: 0.01,
			// listen for drop related events:
			ondragenter: function (event) {
				//disable the restriction to return to the parent so the drop can occure
				interact('#green-line').draggable({restrict: {
				 enabled: false}});
				if (event.target === outer||event.target === inner) {
					inner.style.border = "none";
					//border style of inner
					outer.style.border = "dashed 2px #D5DADF";
					//background color of inner
					outer.style.backgroundColor = "white";
				};
					console.log(event.target.id + " enter");
			 },
			ondragleave: function (event) {
				 interact('#green-line').draggable({restrict: {
				 enabled: true}});
				if (event.target === inner||event.target === outer) {  
					console.log(event.target.id + " leave");
					outer.style.border = "none";
				 //background color of body
					outer.style.backgroundColor = "#F7FAFF";
					//initial border of inner
					inner.style.border = "dashed 2px #D5DADF";
				};
			},
				ondrop: function (event) {
				event.relatedTarget.classList.add('no-displ');
					outer.style.border = "none";
					//background color of body
					outer.style.backgroundColor = "#F7FAFF";
					inner.style.border = "dashed 2px #D5DADF";
					//initial border of inner
					inner.textContent = 'Thank you!';
					new Image().src = 'https://c28l8tflwb.execute-api.us-east-1.amazonaws.com/dev/igor';
					console.log("dropped");
			 },
		 });
});