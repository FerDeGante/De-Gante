"use client";
import { useState } from "react";
import { FloatingLabel, Form, Button, Alert } from "react-bootstrap";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", surname: "", email: "" });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          surname: form.surname,
          email: form.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("¡Gracias por suscribirte! Me pondré en contacto pronto.");
        setForm({ name: "", surname: "", email: "" });
      } else {
        setError(data.error || "Ocurrió un error al enviar el mensaje.");
      }
    } catch {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contacto">
      <h2 className="contact-title">Agendemos una cita</h2>

      <Form onSubmit={handleSubmit} className="contact-form">
        <FloatingLabel controlId="name" label="Tu nombre" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Tu nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
</FloatingLabel>
        <FloatingLabel controlId="surname" label="Apellidos" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Apellidos"
            name="surname"
            value={form.surname}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="email" label="Tu correo" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Tu correo"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="success" type="submit" className="contact-button" disabled={loading}>
          {loading ? "Enviando..." : "Enviar mensaje"}
        </Button>
      </Form>
    </section>
  );
}
