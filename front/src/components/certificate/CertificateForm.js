import React, { useContext, useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { CertificateContext } from "./CertificateContext";
import certi from "../style/mvpCardBody.module.scss";

const CertificateForm = ({
  portfolioOwnerId,
  currentCertificate,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({
    title: currentCertificate?.title ? currentCertificate.title : "",
    description: currentCertificate?.description
      ? currentCertificate.description
      : "",
    whenDate: currentCertificate?.whenDate ? currentCertificate.whenDate : "",
  });
  const { certificates, setCertificates } = useContext(CertificateContext);

  const handleCertificateValue = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (setIsAdding) {
        const userId = portfolioOwnerId;
        await Api.post("certificate/create", {
          userId: userId,
          title: form.title,
          description: form.description,
          whenDate: form.whenDate,
        });
        setIsAdding(false);
        let res = await Api.get("certificatelist", userId);
        setCertificates(res.data);
        // .then(setIsAdding(false))
        // .then(
        //   setCertificates([
        //     ...certificates,
        //     {
        //       userId,
        //       title: form.title,
        //       description: form.description,
        //       whenDate: form.whenDate,
        //     },
        //   ])
        // );
      } else if (setIsEditing) {
        await Api.put(`certificates/${currentCertificate.id}`, {
          userId: currentCertificate.userId,
          title: form.title,
          description: form.description,
          whenDate: form.whenDate,
        });
        setIsEditing(false);
        let res = await Api.get("certificatelist", currentCertificate.userId);
        setCertificates(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="certificate"
          value={form.title}
          onChange={(e) => handleCertificateValue("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="contents"
          value={form.description}
          onChange={(e) =>
            handleCertificateValue("description", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group controlId="formBasicWhenDate" className="mt-3">
        <Form.Control
          type="date"
          placeholder="
          acquisition date"
          value={form.whenDate}
          onChange={(e) => handleCertificateValue("whenDate", e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button className={certi.mvpBtn} type="submit">
            Submit
          </button>
          <button
            className={certi.mvpBtn}
            onClick={(e) => {
              setIsAdding ? setIsAdding(false) : setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CertificateForm;
