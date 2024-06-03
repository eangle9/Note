import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, updateNote } from "../../components/features/notes/notesSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/error message/ErrorMessage";

const SingleNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [catagory, setCatagory] = useState("");
  const [date, setDate] = useState("");
  const { error, loading } = useSelector((state) => state.notes);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const feaching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);
      setTitle(data.title);
      setContent(data.content);
      setCatagory(data.catagory);
      setDate(data.updatedAt);
    };

    feaching();
  }, [id, date]);

  const handleReset = () => {
    setTitle("");
    setContent("");
    setCatagory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !catagory) return;
    dispatch(updateNote({ id, title, content, catagory }));
    handleReset();
    navigate("/myNotes");
  };

  const onDeleteHandler = () =>{
    if (window.confirm("are you sure you want to delete?")) {
        dispatch(deleteNote(id));
        navigate("/myNotes");
      }
  }

  return (
    <MainScreen title="Edit Note">
      <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
        <Card>
          <Card.Header>Edit your note</Card.Header>
          <Card.Body>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter the content"
                  value={content}
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
              <Form.Group className="mb-3" controlId="catagory">
                <Form.Label>Enter catagory</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter catagory"
                  value={catagory}
                  onChange={(e) => setCatagory(e.target.value)}
                />
              </Form.Group>

              <Button type="submit">UPDATE NOTE</Button>
              <Button variant="danger" className="mx-2" onClick={() => onDeleteHandler()}>
                DELETE NOTE
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            Updated on - {date.substring(0, 10)}{" "}
          </Card.Footer>
        </Card>
      </div>
    </MainScreen>
  );
};

export default SingleNote;
