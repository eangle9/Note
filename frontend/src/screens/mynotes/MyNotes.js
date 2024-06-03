import React, { useEffect } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  notesList,
} from "../../components/features/notes/notesSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/error message/ErrorMessage";
// import Notes from "../../data/notes";
// import axios from "axios";

const MyNotes = ({search}) => {
  const dispatch = useDispatch();
  const { loading, notes, error } = useSelector((state) => state.notes);
  const { userInfo } = useSelector((state) => state.userLogin);
  // const noteCreate = useSelector((state) => state.notes);
  // const { success: successCreate } = noteCreate;
  // const noteUpdate = useSelector((state) => state.notes)
  // const { success : successUpdate } = noteUpdate;
  const navigate = useNavigate();
  // console.log("name", name);

  // const [notes, setNotes] = useState([]);
  // const fetchdata = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   setNotes(data);
  // };

  useEffect(() => {
    console.log("userInfo: ", userInfo)
    if (!userInfo) {
      navigate("/");
    }
    dispatch(notesList());
  }, [dispatch, navigate, userInfo]);

  const OnDeleteHandler = (id) => {
    if (window.confirm("are you sure you want to delete?")) {
      dispatch(deleteNote(id));
    }
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return <div onClick={decoratedOnClick}>{children}</div>;
  }

  return (
    <div>
      <MainScreen title={`Wellcome Back ${userInfo.name}...`}>
        <div>
          <Link to="/createnewnote">
            <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
              CREATE NEW NOTE
            </Button>
          </Link>
        </div>
        {loading && <Loading />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {Array.isArray(notes) &&
          notes
            ?.slice()
            .reverse().filter((filteredNote) => (
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            ))
            .map((note) => (
              <Accordion key={note._id} defaultActiveKey="0">
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        fontSize: 18,
                        alignSelf: "center",
                        flex: 1,
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      <CustomToggle eventKey="1">{note.title}</CustomToggle>
                    </span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button href={`/note/${note._id}`}>Edit</Button>

                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => OnDeleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Badge
                        bg="success"
                        style={{
                          padding: "10px",
                          fontSize: "16px",
                          marginBottom: "5px",
                        }}
                      >{`catagory - ${note.catagory}`}</Badge>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on -{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
