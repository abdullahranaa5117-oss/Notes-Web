import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form"

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Login({ show, handleClose, onLogin }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formdata) => {
        try {

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login`, {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            })
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/dashboard")

            onLogin(data.user);
            reset();
            handleClose();
            toast.success('Login successful')
        } catch (err) {
            toast.error(' No Network')
        }
    }





    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="bg-dark text-white" closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email"
                            {...register("Email", {
                                required: "Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                            })} />
                        {errors.Email && <Form.Text className="text-danger">{errors.Email.message}</Form.Text>}
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("Password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters"
                                }
                            })}
                        />
                        {errors.Password && <Form.Text className="text-danger">{errors.Password.message}</Form.Text>}
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>Close</Button>
                    <Button
                        variant="dark"
                        type="submit"
                        disabled={isSubmitting}
                    > Login</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}