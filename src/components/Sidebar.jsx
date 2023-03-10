import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => {
        const lines = note.body.split("\n");
        const summary = lines[0];
        return (
            <div key={note.id}>
                <div

                    className={`title ${note.id === props.currentNote.id ? "selected-note" : ""
                        }`}
                    onClick={() => props.setCurrentNoteId(note.id)}
                >
                    <h4 className="text-snippet">{summary}</h4>
                    <button type="button" onClick={(Event) => props.deleteNote(Event, note.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        )
    })

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
