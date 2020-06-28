import React from "react";
// https://react-bootstrap.github.io/
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
// https://aws-amplify.github.io/amplify-js/api/
import { API, graphqlOperation } from "aws-amplify";
import { createNote, deleteNote, updateNote } from "../graphql/mutations";
import { listNotes } from "../graphql/queries";
import {
  onCreateNote,
  onDeleteNote,
  onUpdateNote,
} from "../graphql/subscriptions";

const UserNotes = (props) => {
  // ID for submitted notes
  const [id, setId] = React.useState("");
  // Text area before submission
  const [note, setNote] = React.useState("");
  // Submitted notes
  const [notes, setNotes] = React.useState([]);

  // Add Listeners for creating, deleting, and updating notes when the component mounts
  React.useEffect(() => {
    getNotes();
    const createNoteListener = API.graphql(
      graphqlOperation(onCreateNote, { owner: props.username })
    ).subscribe({
      next: (noteData) => {
        const newNote = noteData.value.data.onCreateNote;
        // Render updated notes (created)
        setNotes((prevNotes) => {
          const oldNotes = prevNotes.filter((note) => note.id !== newNote.id);
          const updatedNotes = [...oldNotes, newNote];
          return updatedNotes;
        });
        // Clear text area
        setNote("");
      },
    });
    const deleteNoteListener = API.graphql(
      graphqlOperation(onDeleteNote, {
        owner: props.username,
      })
    ).subscribe({
      next: (noteData) => {
        const deleteNote = noteData.value.data.onDeleteNote;
        // Render updated notes (deleted)
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.filter(
            (note) => note.id !== deleteNote.id
          );
          return updatedNotes;
        });
      },
    });
    const updateNoteListener = API.graphql(
      graphqlOperation(onUpdateNote, {
        owner: props.username,
      })
    ).subscribe({
      next: (noteData) => {
        const updatedNote = noteData.value.data.onUpdateNote;
        // Render updated notes, clear text area and id
        setNotes((prevNotes) => {
          const index = prevNotes.findIndex(
            (note) => note.id === updatedNote.id
          );
          const updatedNotes = [
            ...prevNotes.slice(0, index),
            updatedNote,
            ...prevNotes.slice(index + 1),
          ];
          return updatedNotes;
        });
        setNote("");
        setId("");
      },
    });
    // Remove Listeners when the component unmounts
    return () => {
      createNoteListener.unsubscribe();
      deleteNoteListener.unsubscribe();
      updateNoteListener.unsubscribe();
    };
    // Empty array ensures useEffect will only run when component mounts
  }, [props.username]);

  // Get the current list of notes
  const getNotes = async () => {
    const result = await API.graphql(graphqlOperation(listNotes));
    setNotes(result.data.listNotes.items);
  };

  // Handle changes in the text area for new notes
  const handleChangeNote = (event) => setNote(event.target.value);

  // Check to see if note already exists
  const hasExistingNote = () => {
    if (id) {
      const isNote = notes.findIndex((note) => note.id === id) > -1;
      return isNote;
    }
    return false;
  };

  // Handle adding new notes
  const handleAddNote = async (event) => {
    event.preventDefault();
    if (hasExistingNote()) {
      handleUpdateNote();
    } else {
      const input = { note };
      await API.graphql(graphqlOperation(createNote, { input }));
    }
  };

  // Handle updating an existing note
  const handleUpdateNote = async () => {
    const input = { id, note };
    await API.graphql(graphqlOperation(updateNote, { input }));
  };

  // Handle deleting notes
  const handleDeleteNote = async (noteId) => {
    const input = { id: noteId };
    await API.graphql(graphqlOperation(deleteNote, { input }));
  };

  // Handle setting/selecting note to be updated
  const handleSetNote = ({ note, id }) => {
    setNote(note);
    setId(id);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center text-center text-white bg-primary py-4">
        <h1>Notepad 🗒</h1>
        <div className="container">
          <Form onSubmit={handleAddNote}>
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                placeholder="New note..."
                value={note}
                onChange={handleChangeNote}
              />
              <InputGroup.Append>
                {/* Add/update note button */}
                <Button variant="light" type="submit">
                  {id ? "Update Note" : "Add Note"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      </div>
      <div className="container bg-light vh-100">
        {notes.map((item) => (
          <div key={item.id} className="d-flex justify-content-center py-2">
            {/* Inline arrow functions (https://reactjs.org/docs/faq-functions.html) prevent function from running on page load (handleSetNote and handleDeleteNote) */}
            <li
              className="list-group-item mx-4"
              onClick={() => handleSetNote(item)}
            >
              {item.note}
            </li>
            {/* Delete note button */}
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => handleDeleteNote(item.id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserNotes;
