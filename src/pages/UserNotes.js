import React, { Component } from "react";
// https://react-bootstrap.github.io/
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
// https://aws-amplify.github.io/amplify-js/api/
import { API, graphqlOperation } from "aws-amplify";
import { createNote } from "../graphql/mutations";
import { listNotes } from "../graphql/queries";

class UserNotes extends Component {
  state = {
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

  // Handle adding new notes
  handleAddNote = async (event) => {
    const { note, notes } = this.state;
    event.preventDefault();
    const input = { note };
    const result = await API.graphql(graphqlOperation(createNote, { input }));
    const newNote = result.data.createNote;
    const updatedNotes = [newNote, ...notes];
    // Render new notes and clear text area
    this.setState({ notes: updatedNotes, note: "" });
  };

  render() {
    const { note, notes } = this.state;

    return (
      <>
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
                  <Button variant="light" type="submit">
                    Add Note
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </div>
        </div>
        <div className="container">
          {notes.map((item) => (
            <div key={item.id} className="d-flex mt-4">
              <li className="list-group-item mr-4">{item.note}</li>
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default UserNotes;
