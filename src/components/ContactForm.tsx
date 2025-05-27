"use client";
import { FloatingLabel, Form, Button } from "react-bootstrap";

export default function ContactForm() {
  return (
    <section className="contact-section" id="contacto">
      <h2 className="contact-title">Agendemos una cita</h2>
      <Form
        action="https://YOUR_MAILCHIMP_URL"
        method="POST"
        target="_blank"
        className="contact-form"
      >
        <FloatingLabel controlId="name" label="Tu nombre" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Tu nombre"
            name="NAME"
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="email" label="Tu correo" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Tu correo"
            name="EMAIL"
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="message" label="¿Cómo puedo ayudarte?" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Escribe tu mensaje aquí"
            name="MESSAGE"
            style={{ height: "150px" }}
            required
          />
        </FloatingLabel>

        <Button variant="success" type="submit" className="contact-button">
          Enviar mensaje
        </Button>
      </Form>
    </section>
  );
}
