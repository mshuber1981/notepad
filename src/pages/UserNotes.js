import React, { Component } from "react";
// https://react-bootstrap.github.io/
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
// https://aws-amplify.github.io/amplify-js/api/
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createNote, deleteNote, updateNote } from "../graphql/mutations";
import { listNotes } from "../graphql/queries";
import {
  onCreateNote,
  onDeleteNote,
  onUpdateNote,
} from "../graphql/subscriptions";

class UserNotes extends Component {
  state = {
    // ID for submitted notes
    id: "",
    // Text area before submission
    note: "",
    // Submitted notes
    notes: [],
  };

  // Add Listeners for creating, deleting, and updating notes when the component mounts
  async componentDidMount() {
    this.getNotes();
    this.createNoteListener = API.graphql(
      graphqlOperation(onCreateNote, {
        owner: (await Auth.currentUserInfo()).username,
      })
    ).subscribe({
      next: (noteData) => {
        const newNote = noteData.value.data.onCreateNote;
        const prevNotes = this.state.notes.filter(
          (note) => note.id !== newNote.id
        );
        const updatedNotes = [...prevNotes, newNote];
        // Render updated notes (created)
        this.setState({ notes: updatedNotes });
      },
    });
    this.deleteNoteListener = API.graphql(
      graphqlOperation(onDeleteNote, {
        owner: (await Auth.currentUserInfo()).username,
      })
    ).subscribe({
      next: (noteData) => {
        const deleteNote = noteData.value.data.onDeleteNote;
        const updatedNotes = this.state.notes.filter(
          (note) => note.id !== deleteNote.id
        );
        // Render updated notes (deleted)
        this.setState({ notes: updatedNotes });
      },
    });
    this.updateNoteListener = API.graphql(
      graphqlOperation(onUpdateNote, {
        owner: (await Auth.currentUserInfo()).username,
      })
    ).subscribe({
      next: (noteData) => {
        const { notes } = this.state;
        const updatedNote = noteData.value.data.onUpdateNote;
        const index = this.state.notes.findIndex(
          (note) => note.id === updatedNote.id
        );
        const updatedNotes = [
          ...notes.slice(0, index),
          updatedNote,
          ...notes.slice(index + 1),
        ];
        // Render updated notes, clear text area and id
        this.setState({ notes: updatedNotes, note: "", id: "" });
      },
    });
  }

  // Remove Listeners when the component unmounts
  componentWillUnmount() {
    this.createNoteListener.unsubscribe();
    this.deleteNoteListener.unsubscribe();
    this.updateNoteListener.unsubscribe();
  }

  // Get the current list of notes
  getNotes = async () => {
    const result = await API.graphql(graphqlOperation(listNotes));
    this.setState({ notes: result.data.listNotes.items });
  };

  // Handle changes in the text area for new notes
  handleChangeNote = (event) => this.setState({ note: event.target.value });

  // Check to see if note already exists
  hasExistingNote = () => {
    const { notes, id } = this.state;
    if (id) {
      const isNote = notes.findIndex((note) => note.id === id) > -1;
      return isNote;
    }
    return false;
  };

  // Handle adding new notes
  handleAddNote = async (event) => {
    const { note } = this.state;
    event.preventDefault();
    if (this.hasExistingNote()) {
      this.handleUpdateNote();
    } else {
      const input = { note };
      await API.graphql(graphqlOperation(createNote, { input }));
      // Clear text area
      this.setState({ note: "" });
    }
  };

  // Handle updating an existing note
  handleUpdateNote = async () => {
    const { id, note } = this.state;
    const input = { id, note };
    await API.graphql(graphqlOperation(updateNote, { input }));
  };

  // Handle deleting notes
  handleDeleteNote = async (noteId) => {
    const input = { id: noteId };
    await API.graphql(graphqlOperation(deleteNote, { input }));
  };

  // Handle setting/selecting note to be updated
  handleSetNote = ({ note, id }) => this.setState({ note, id });

  render() {
    const { id, note, notes } = this.state;

    return (
      <div className="home">
        <div className="d-flex flex-column justify-content-center align-items-center text-center text-white bg-primary py-4">
          <h1>Notepad 🗒</h1>
          <div className="container">
            <Form onSubmit={this.handleAddNote}>
              <InputGroup>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  placeholder="New note..."
                  value={note}
                  onChange={this.handleChangeNote}
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
            <div key={item.id} className="d-flex justify-content-center pt-4">
              {/* Inline arrow functions (https://reactjs.org/docs/faq-functions.html) prevent function from running on page load (handleSetNote and handleDeleteNote) */}
              <li
                className="list-group-item mr-4"
                onClick={() => this.handleSetNote(item)}
              >
                {item.note}
              </li>
              {/* Delete note button */}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => this.handleDeleteNote(item.id)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UserNotes;
