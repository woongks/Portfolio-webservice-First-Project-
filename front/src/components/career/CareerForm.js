import React, { useState, useContext } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import car from "../style/mvpCardBody.module.scss";
import { CareerContext } from "./CareerContext";
const CareerForm = ({
  portfolioOwnerId,
  currentCareer,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({
    company: currentCareer?.company ? currentCareer.company : "",
    fromDate: currentCareer?.fromDate ? currentCareer.fromDate : "",
    toDate: currentCareer?.toDate ? currentCareer.toDate : "",
  });
  const { careers, setCareers } = useContext(CareerContext);
  const handleCareerValue = (name, value) => {
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
        await Api.post("career/create", {
          userId: userId,
          company: form.company,
          fromDate: form.fromDate,
          toDate: form.toDate,
        });
        setIsAdding(false);
        await Api.get("careerlist", userId).then((res) => setCareers(res.data));
      } else if (setIsEditing) {
        await Api.put(`careers/${currentCareer.id}`, {
          userId: currentCareer.userId,
          company: form.company,
          fromDate: form.fromDate,
          toDate: form.toDate,
        });
        setIsEditing(false);
        /* */
        const res = await Api.get("careerlist", currentCareer.userId);
        setCareers(res.data);
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
          placeholder="company name"
          value={form.company}
          onChange={(e) => handleCareerValue("company", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicFromDate" className="mt-3">
        <Form.Control
          type="date"
          placeholder="start work"
          value={form.fromDate}
          onChange={(e) => handleCareerValue("fromDate", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicToDate" className="mt-3">
        <Form.Control
          type="date"
          min={form?.fromDate}
          placeholder="resign"
          value={form.toDate}
          onChange={(e) => handleCareerValue("toDate", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3 text-center">
        <Col>
          <button className={car.mvpBtn} type="submit">
            Submit
          </button>
          <button className={car.mvpBtn} onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CareerForm;
