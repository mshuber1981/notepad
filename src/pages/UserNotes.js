import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { createNote } from "../graphql/mutations";

class UserNotes extends Component {
  state = {
    note: "",
    notes: [],
  };

  handleChangeNote = (event) => this.setState({ note: event.target.value });
  handleAddNote = async (event) => {
    const { note, notes } = this.state;
    event.preventDefault();
    const input = { note };
    const result = await API.graphql(graphqlOperation(createNote, { input }));
    const newNote = result.data.createNote;
    const updatedNotes = [newNote, ...notes];
    this.setState({ notes: updatedNotes, note: "" });
  };

  render() {
    const { note, notes } = this.state;

    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center text-center text-white bg-primary py-4">
          <h1>Notepad 🗒</h1>
          <Container>
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
          </Container>
        </div>
        <Container>
          {notes.map((item) => (
            <div key={item.id} className="d-flex mt-4">
              <li className="list-group-item mr-4">{item.note}</li>
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ))}
        </Container>
      </div>
    );
  }
}

export default UserNotes;
