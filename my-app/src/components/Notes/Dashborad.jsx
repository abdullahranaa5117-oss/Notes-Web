import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import AddNotes from "./Modal/addnotes";
import { toast } from "react-toastify";
import EditNotes from "./Modal/editnotes";


function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [showAddNote, setShowAddNote] = useState(false);
    const [showEditNote, setShowEditNote] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(false);



    const GetNote = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/notes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json()

            if (!res.ok) { toast.error(data.message || "Failed to fetch Notes"); return; }
            setNotes(data);
        } catch (err) {
            toast.error('No Notes fetched')
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        GetNote();
    }, [])
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/notes/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) return toast.error(data.message || "Delete failed");
            toast.success("Deleted successfully");
            GetNote();
        } catch {
            toast.error("Error deleting task");
        }
    };

    if (loading) {
        return <h3 className="text-center  mt-4 "><Spinner animation="border" /></h3>;

    }



    return (
        <>
            <Container fluid>
                <Row className="justify-content-center p-2 m-2">
                    <Col lg={6}>
                        <h1 className="fw-bold"> Notes App</h1>
                        <p>Keep track of your notes and due dates in one place</p>
                        <Button variant='dark' onClick={() => setShowAddNote(true)} >Add Note</Button>
                    </Col>
                </Row>
                <Row>
                    {notes.map(note => (<Col
                        lg={4}
                        md={6}
                        sm={12}
                        key={note._id}
                    >
                        <Card className="mb-3"
                            style={{
                                background: "#ffffff",
                                overflow: 'hidden',
                                transition: 'opacity 0.2s ease'
                            }}>
                            <Card.Body>
                                <Card.Text>
                                    {new Date(note.DueDate).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </Card.Text>
                                <Card.Title className="fw-bold">{note.Title}</Card.Title>

                                <Card.Text>{note.Note}</Card.Text>
                                <Button className="me-2" variant="dark"
                                    onClick={() => {
                                        setSelectedNote(note);
                                        setShowEditNote(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(note._id)}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}

                </Row>
            </Container>

            <AddNotes
                show={showAddNote}
                handleClose={() => setShowAddNote(false)}
                onNoteAdded={GetNote}
            />
            <EditNotes
                show={showEditNote}
                handleClose={() => setShowEditNote(false)}
                note={selectedNote}
                onNoteUpdated={GetNote}
            />
        </>
    )
}

export default Dashboard;