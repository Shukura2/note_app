
const userList = document.querySelector(".name-list");
const textArea = document.querySelector(".text-area-border");
const addListBtn = document.querySelector(".addListBtn");


const arr = JSON.parse(localStorage.getItem('text')) || []

const noteFromStorage = arr.map(item =>{
    const newLi = document.createElement("LI");
    const wrap = document.createElement("div");
    wrap.className = "return"
    wrap.innerHTML = item;

    // *** Creating Edit Button ***
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "EDIT";
    editBtn.className ='editBtn'
    editBtn.style.backgroundColor = "green";
    editBtn.style.color = "white";
    const removeid = userList.childElementCount;
    editBtn.setAttribute('id', removeid)

    // *** Creating Delete Button ***
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";
    deleteBtn.style.backgroundColor = "Red";
    deleteBtn.style.color = "white";
    deleteBtn.className ="deleteBtn";
    deleteBtn.setAttribute('id', removeid)

    // *** Adding created elements to LI TAG
    newLi.appendChild(wrap);
    newLi.appendChild(editBtn);
    newLi.appendChild(deleteBtn);
    userList.appendChild(newLi);

})

userList.addEventListener('click', function (e){
    // event listner for the delete buttton
    if(e.target.classList.contains('deleteBtn')){
        if (confirm("You are going to lose this Note")) {
            const li = e.target.parentElement;
            const ol = li.parentNode;
            ol.removeChild(li);
            arr.splice(parseInt(e.target.id), 1)
            localStorage.setItem('text', JSON.stringify(arr));
            }
    }

    // event listener for the edit button
    if(e.target.classList.contains('editBtn')){
        if (e.target.textContent === "EDIT") {
            const button = e.target;
        const li = e.target.parentNode;
        const span = li.firstElementChild;
        const input = document.createElement("input");
        // input.style.width = '85%';
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'SAVE';
        } else if (e.target.textContent === 'SAVE') {
            const button = e.target;
            const li = e.target.parentNode;
            const input = li.firstElementChild;
            const span = document.createElement('div');
            span.className = 'return'
            //span.style.width = '80%';
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            // wrap.style.width = '400px';
            button.textContent = 'EDIT';
            arr[parseInt(event.target.id)] = span.textContent
            localStorage.setItem('text', JSON.stringify(arr));
        }
    }
})



addListBtn.addEventListener("click", function () {
    if (textArea.value == "") {
        return
    }
    addNote(textArea.value)
});

function addNote(note){
    const newLi = document.createElement("LI");
    const wrap = document.createElement("div");
    wrap.className = "return"
    wrap.innerHTML = note;
    arr.push(textArea.value);
    localStorage.setItem('text', JSON.stringify(arr));
    location.reload()
    
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "EDIT";
    editBtn.style.backgroundColor = "green";
    editBtn.style.color = "white";
    // editBtn.style.marginLeft = "65%";
    // editBtn.style.marginRight = "2px";
    editBtn.style.cursor = "pointer"; 
    const removeid = userList.childElementCount;
    editBtn.setAttribute('id', removeid)
   
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";
    deleteBtn.style.backgroundColor = "Red";
    deleteBtn.style.color = "white";
    //deleteBtn.style.float = "right";
    deleteBtn.className ="bn";
    //const removeid = userList.childElementCount;
    deleteBtn.setAttribute('id', removeid)

    
    newLi.appendChild(wrap);
    newLi.appendChild(editBtn);
    newLi.appendChild(deleteBtn);

    userList.appendChild(newLi);
    textArea.value = "";
    
}


 function enableDragSort(listClass) {
     console.log(listClass)
    const sortableLists = document.getElementsByClassName(listClass);
    Array.prototype.map.call(sortableLists, (list) => {enableDragList(list)});
  }
  
  function enableDragList(list) {
    Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
  }
  
  function enableDragItem(item) {
    item.setAttribute('draggable', true)
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
  }
  
  function handleDrag(item) {
     // console.log(item)
    const selectedItem = item.target,
          list = selectedItem.parentNode,
          x = event.clientX,
          y = event.clientY;
         // console.log(x, y)
          //console.log(list)
    
    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
    //console.log(document.elementFromPoint(x, y) === null)
    if (list === swapItem.parentNode) {
        console.log(swapItem.parentNode)
        console.log(list)
      swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      //console.log(swapItem !== selectedItem.nextSibling)
      console.log(selectedItem)
      console.log(swapItem)
      list.insertBefore(selectedItem, swapItem);
      console.log(selectedItem)
      console.log(swapItem)
    }
  }
  
  function handleDrop(item) {
    item.target.classList.remove('drag-sort-active');
  }
  
  (()=> {enableDragSort('name-list')})();




