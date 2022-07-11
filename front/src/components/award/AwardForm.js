import React, { useState, useContext } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { AwardContext } from "./AwardContext";
import aw from "../style/mvpCardBody.module.scss";

const AwardForm = ({
  portfolioOwnerId,
  currentAward,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({
    title: currentAward?.title ? currentAward.title : "",
    description: currentAward?.description ? currentAward.description : "",
  });
  const { awards, setAwards } = useContext(AwardContext);
  const handleAwardValue = (name, value) => {
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
        await Api.post("award/create", {
          userId: userId,
          title: form.title,
          description: form.description,
        });
        setIsAdding(false);
        let res = await Api.get("awardlist", userId);
        setAwards(res.data);
        // .then(setIsAdding(false))
        // .then(
        //   setAwards([
        //     ...awards,
        //     {
        //       userId,
        //       title: form.title,
        //       description: form.description,
        //     },
        //   ])
        // );
      } else if (setIsEditing) {
        await Api.put(`awards/${currentAward.id}`, {
          userId: currentAward.userId,
          title: form.title,
          description: form.description,
        });
        setIsEditing(false);
        let res = await Api.get("awardlist", currentAward.userId);
        setAwards(res.data);
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
          placeholder="award"
          autoComplete="off"
          value={form.title}
          onChange={(e) => handleAwardValue("title", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="description"
          value={form.description}
          onChange={(e) => handleAwardValue("description", e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button className={aw.mvpBtn} type="submit">
            Submit
          </button>
          <button
            className={aw.mvpBtn}
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

export default AwardForm;
