import React, { Component } from "react";
// https://react-bootstrap.github.io/
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
// https://aws-amplify.github.io/amplify-js/api/
import { API, graphqlOperation } from "aws-amplify";
import { createNote, deleteNote, updateNote } from "../graphql/mutations";
import { listNotes } from "../graphql/queries";

class UserNotes extends Component {
  state = {
    // ID for submitted notes
    id: "",
    // Text area before submission
    note: "",
    // Submitted notes
    notes: [],
  };

  // Update submitted notes when component mounts
  async componentDidMount() {
    const result = await API.graphql(graphqlOperation(listNotes));
    this.setState({ notes: result.data.listNotes.items });
  }

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
    const { note, notes } = this.state;
    event.preventDefault();
    if (this.hasExistingNote()) {
      this.handleUpdateNote();
    } else {
      const input = { note };
      const result = await API.graphql(graphqlOperation(createNote, { input }));
      const newNote = result.data.createNote;
      const updatedNotes = [newNote, ...notes];
      // Render new notes and clear text area
      this.setState({ notes: updatedNotes, note: "" });
    }
  };

  // Handle updating an existing note
  handleUpdateNote = async () => {
    const { id, notes, note } = this.state;
    const input = { id, note };
    const result = await API.graphql(graphqlOperation(updateNote, { input }));
    const updatedNote = result.data.updateNote;
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    const updatedNotes = [
      ...notes.slice(0, index),
      updatedNote,
      ...notes.slice(index + 1),
    ];
    // Render updated notes, clear text area and id
    this.setState({ notes: updatedNotes, note: "", id: "" });
  };

  // Handle deleting notes
  handleDeleteNote = async (noteId) => {
    const { notes } = this.state;
    const input = { id: noteId };
    const result = await API.graphql(graphqlOperation(deleteNote, { input }));
    const deleteNoteID = result.data.deleteNote.id;
    const updatedNotes = notes.filter((note) => note.id !== deleteNoteID);
    this.setState({ notes: updatedNotes });
  };

  // Handle updating existing notes
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
