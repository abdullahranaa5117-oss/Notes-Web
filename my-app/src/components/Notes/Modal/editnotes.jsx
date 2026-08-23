import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form"

import { toast } from "react-toastify";
import { useEffect } from 'react';

export default function EditNotes({ show, handleClose, note, onNoteUpdated }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (formdata) => {
        const token = localStorage.getItem("token");
        try {

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/notes/${note._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            })
            const data = await res.json()
            if (!res.ok) {
                toast.error(data.message);
                return;
            }
            onNoteUpdated(data);
            reset();
            handleClose();
            toast.success('Note Edit')
        } catch (err) {
            toast.error('No Note Edit')
        }
    }
    useEffect(() => {
        if (note) {
            reset({
                Title: note.Title,
                Note: note.Note,
                DueDate: note.DueDate?.split("T")[0],
            });
        }
    }, [note, reset]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="bg-dark text-white" closeButton>
                <Modal.Title>Edit Note</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Title"
                            {...register("Title", {
                                required: "Title is required",
                                minLength: { value: 3, message: "Min 3 characters" },
                                maxLength: { value: 50, message: "Max 50 characters" }
                            })} />
                        {errors.Title && <Form.Text className="text-danger">{errors.Title.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" rows={3} placeholder="Note"
                            {...register("Note", {
                                required: "Note is required",
                                minLength: { value: 5, message: "Min 5 characters" },
                                maxLength: { value: 500, message: "Max 500 characters" }
                            })} />
                        {errors.Note && <Form.Text className="text-danger">{errors.Note.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="date" {...register("DueDate", { required: "Due date is required" })} />
                        {errors.DueDate && <Form.Text className="text-danger">{errors.DueDate.message}</Form.Text>}
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>Close</Button>
                    <Button variant="dark" type="submit" disabled={isSubmitting}>Edit Note</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}