function showRegister() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('register-container').style.display = 'block';
  document.getElementById('home-container').style.display = 'none';
}

function showLogin() {
  document.getElementById('register-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'block';
  document.getElementById('home-container').style.display = 'none';
}

function showHome() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('register-container').style.display = 'none';
  document.getElementById('home-container').style.display = 'block';
}

function openFolder(subject) {
  document.getElementById('home-container').style.display = 'none';
  document.getElementById('subject-title').innerText = subject;
  document.getElementById('subject-notes-container').style.display = 'block';
  loadNotes(subject);
}

function showNewNoteForm() {
  document.getElementById('subject-notes-container').style.display = 'none';
  document.getElementById('note-container').style.display = 'block';
}

function saveNote() {
  const title = document.getElementById('note-title').value;
  const date = document.getElementById('note-date').value;
  const className = document.getElementById('note-class').value;
  const professor = document.getElementById('note-professor').value;
  const keyPoints = document.getElementById('note-key-points').value;
  const mainNotes = document.getElementById('note-main').value;
  const summary = document.getElementById('note-summary').value;
  const subject = document.getElementById('subject-title').innerText;

  const note = {
    title,
    date,
    className,
    professor,
    keyPoints,
    mainNotes,
    summary,
    subject
  };

  // Save the note to localStorage
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));

  alert('Note saved and email reminder sent!');
  document.getElementById('note-container').style.display = 'none';
  document.getElementById('subject-notes-container').style.display = 'block';
  loadNotes(subject);
}

function loadNotes(subject) {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const subjectNotes = notes.filter(note => note.subject === subject);

  subjectNotes.forEach((note, index) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.innerHTML = `
      <h3>${note.title}</h3>
      <p>Date: ${note.date}</p>
      <p>Class: ${note.className}</p>
      <p>Professor: ${note.professor}</p>
      <div class="cornell-notes">
        <div class="key-points">
          <h4>Key Points</h4>
          <p>${note.keyPoints}</p>
        </div>
        <div class="notes">
          <h4>Notes</h4>
          <p>${note.mainNotes}</p>
        </div>
        <div class="summary">
          <h4>Summary</h4>
          <p>${note.summary}</p>
        </div>
      </div>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-note';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteNote(subject, index);
    });

    noteItem.appendChild(deleteButton);
    notesList.appendChild(noteItem);
  });
}

function deleteNote(subject, index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  const subjectNotes = notes.filter(note => note.subject === subject);
  subjectNotes.splice(index, 1);
  notes = notes.filter(note => note.subject !== subject).concat(subjectNotes);
  localStorage.setItem('notes', JSON.stringify(notes));
  loadNotes(subject);
}

function openCreateSubjectModal() {
  document.getElementById("createSubjectModal").style.display = "block";
}

function closeCreateSubjectModal() {
  document.getElementById("createSubjectModal").style.display = "none";
}

function addNewSubject() {
  const subjectName = document.getElementById("newSubjectName").value;
  if (subjectName) {
    // Create a new button element
    const newSubjectButton = document.createElement('button');
    newSubjectButton.className = 'subject-btn';
    newSubjectButton.textContent = subjectName;

    // Add an event listener to the new button
    newSubjectButton.addEventListener('click', function() {
      // Handle the click event for the new subject button
      openFolder(subjectName);
    });

    // Get the subjects container element
    const subjectsContainer = document.querySelector('.subjects');

    // Append the new button to the subjects container
    subjectsContainer.appendChild(newSubjectButton);

    // Log the new subject creation
    console.log("New subject created:", subjectName);

    closeCreateSubjectModal();
  }
}

function openAboutPage() {
  window.open("about.html", "_blank");
}
