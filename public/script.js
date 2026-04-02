async function fetchNotes() {
  const res = await fetch("/notes");
  const notes = await res.json();

  const notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  notes.forEach(note => {
    notesDiv.innerHTML += `
      <div class="note">
        <h4>${note.title}</h4>
        <p>${note.content}</p>
        <button onclick="deleteNote('${note._id}')">Delete</button>
        <button onclick="updateNote('${note._id}')">Update</button>
      </div>
    `;
  });
}

// ➕ Add
async function addNote() {
  await fetch("/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title: title.value,
      content: content.value
    })
  });

  fetchNotes();
}

// ❌ Delete
async function deleteNote(id) {
  await fetch("/delete/" + id, { method: "DELETE" });
  fetchNotes();
}

// ✏️ Update
async function updateNote(id) {
  const newTitle = prompt("Enter new title:");
  const newContent = prompt("Enter new content:");

  await fetch("/update/" + id, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title: newTitle,
      content: newContent
    })
  });

  fetchNotes();
}

// Load notes on page load
fetchNotes();