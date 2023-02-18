import './App.css'
import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import { nanoid } from "nanoid"

export default function App() {

  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  )

  // Set the initial value of currentNoteId to the id of the first note 
  // in the notes array, or an empty string if notes is empty.
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  //Set up a side-effect that is triggered whenever the notes state variable changes.
  React.useEffect(() => {
    // Store the updated notes array in local storage as a JSON string.
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])
  localStorage.clear();
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "Title"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    setNotes((oldNotes) => {
      const updatedNote = {
        ...findCurrentNote(),
        body: text
      };
      const filteredNotes = oldNotes.filter(
        (note) => note.id !== currentNoteId
      );
      return [updatedNote, ...filteredNotes];
    });
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>

      }
    </main>
  )
}
