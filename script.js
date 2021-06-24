const addBtn = document.getElementById('add');

addBtn.addEventListener('click', () => addNewNote());
function swapNodes(nodeArray) {
  let node1 = nodeArray[0];
  let node2 = nodeArray[1];

  const parent = node1.parentNode;
  const sibling1 = node1.nextSibling === node2 ? node1 : node1.nextSibling;

  parent.insertBefore(node1, node2);
  parent.insertBefore(node2, sibling1);

  node1.classList.remove('selected');
  node2.classList.remove('selected');
}

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
  <div class="tools">
  <button class="edit">
    <i class="fas fa-edit"></i>
  </button>
  <button class="delete">
    <i class="fas fa-trash-alt"></i>
  </button>
</div>
<div class="main ${text ? '' : 'hidden'}"></div>
<textarea class="${text ? 'hidden' : ''}"></textarea>`;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');
  const body = document.querySelector('body');
  textArea.value = text;
  main.innerHTML = text;

  deleteBtn.addEventListener('click', () => {
    note.remove();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', (event) => {
    const text = event.target.value;
    main.innerHTML = text;
  });

  note.addEventListener('click', (event) => {
    if (textArea.classList.contains('hidden') && event.target.tagName !== 'I') {
      note.classList.toggle('selected');
    }
    let childrenArray = Array.from(body.children);
    let selectedNodes = childrenArray.filter((node) =>
      node.classList.contains('selected')
    );
    if (selectedNodes.length === 2) {
      swapNodes(selectedNodes);
    }
  });

  document.body.appendChild(note);
}
