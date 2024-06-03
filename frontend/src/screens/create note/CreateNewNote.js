import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/mainscreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../components/features/notes/notesSlice";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/error message/ErrorMessage";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

const CreateNewNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [catagory, setCatagory] = useState("");
  const loading = useSelector((state) => state.notes.loading);
  const error = useSelector((state) => state.notes.error);
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !catagory) return;
    dispatch(createNote({ title, content, catagory }));
    navigate("/myNotes");
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setCatagory("");
  };

  return (
    <MainScreen title="Create a Note">
      <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
        <Card>
          <Card.Header>create a new note</Card.Header>
          <Card.Body>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content :</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the content"
                  value={content}
                  rows={4}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              {content && (
                <Card>
                  <Card.Header>Note Preview</Card.Header>
                  <Card.Body>
                    <Markdown>{content}</Markdown>
                  </Card.Body>
                </Card>
              )}

              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Catagory :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter catagory"
                  value={catagory}
                  onChange={(e) => setCatagory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button type="submit" variant="primary">
                CREATE NOTE
              </Button>
              <Button className="mx-2" variant="danger" onClick={handleReset}>
                RESET FIELDS
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </div>
    </MainScreen>
  );
};

export default CreateNewNote;
