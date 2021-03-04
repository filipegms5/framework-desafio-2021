document.addEventListener("DOMContentLoaded", load, false);

function load(){    
    const postBtn = document.getElementById('postBtn');
    const toDoBtn = document.getElementById('toDoBtn');
    const albumsBtn = document.getElementById('albumsBtn');
    const searchBar = document.getElementById('searchBar');

    postBtn.addEventListener("click", showPosts);
    toDoBtn.addEventListener("click", showToDos);
    albumsBtn.addEventListener("click", showAlbums);
    searchBar.addEventListener("keyup", searchTbl)

}


async function get(api){
    return await fetch(api)
    .then(response => response.json())
}

async function showPosts(){
    await getApi('posts');
    removeClasses();
    postBtn.classList.add('active');
}

async function showToDos(){
    await getApi('todos');
    removeClasses();
    toDoBtn.classList.add('active');
}

async function showAlbums(){
    await getApi('albums');
    removeClasses();
    albumsBtn.classList.add('active');
}

async function getApi(api){
    document.getElementById('titleText').innerHTML = api.toUpperCase();
    const json = await get('https://jsonplaceholder.typicode.com/' + api);
    document.getElementById('mainTables').style.display = 'flex';
    printJson(json);
}

function removeClasses(){
    document.getElementById('searchBar').value = '';
    postBtn.classList.remove('active');
    toDoBtn.classList.remove('active');
    albumsBtn.classList.remove('active');
}
function printJson(json){
    document.getElementById('mainTitle').style.display = 'none';
    const tblElem = document.getElementById('tblElem');
    tblElem.innerHTML = '';
    json.forEach(post => {
        let trTag = document.createElement('TR');
        let idTag = document.createElement('TD');
        let titleTag = document.createElement('TD');
        idTag.appendChild(document.createTextNode(post.id))
        titleTag.appendChild(document.createTextNode(post.title))
        trTag.appendChild(idTag);
        trTag.appendChild(titleTag);
        tblElem.appendChild(trTag);
    });
}

// snippet do w3schools (EU NÃO ESCREVI ESSA FUNÇÃO)
function searchTbl() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbl");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }


