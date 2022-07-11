import React, { useContext, useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { EducationContext } from "./EducationContext";
import edu from "../style/mvpCardBody.module.scss";

const EducationForm = ({
  portfolioOwnerId,
  currentEducation,
  setIsEditing,
  setIsAdding,
}) => {
  const [form, setForm] = useState({
    school: currentEducation?.school ? currentEducation.school : "",
    major: currentEducation?.major ? currentEducation.major : "",
    position: currentEducation?.position ? currentEducation.position : "",
  });
  const { educations, setEducations } = useContext(EducationContext);

  const handleEducationValue = (name, value) => {
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
        await Api.post("education/create", {
          userId,
          school: form.school,
          major: form.major,
          position: form.position,
        });
        setIsAdding(false);
        await Api.get("educationlist", userId).then((res) =>
          setEducations(res.data)
        );
        // .then(setIsAdding(false))
        // .then(
        //   setEducations([
        //     ...educations,
        //     {
        //       userId:userId,
        //       school: form.school,
        //       major: form.major,
        //       position: form.position,
        //     },
        //   ])
        // );
      } else if (setIsEditing) {
        await Api.put(`educations/${currentEducation.id}`, {
          userId: currentEducation.userId,
          school: form.school,
          major: form.major,
          position: form.position,
        }).then(setIsEditing(false));
        await Api.get("educationlist", currentEducation.userId).then((res) =>
          setEducations(res.data)
        );
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
          placeholder="school name"
          autoComplete="off"
          value={form.school}
          onChange={(e) => handleEducationValue("school", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="major"
          value={form.major}
          onChange={(e) => handleEducationValue("major", e.target.value)}
        />
      </Form.Group>
      <div className="mb-3 mt-3">
        <Form.Check
          inline
          label="attending"
          id="radio1"
          type="radio"
          name="position"
          value="attending"
          checked={form.position === "attending"}
          onChange={(e) => handleEducationValue("position", e.target.value)}
        />
        <Form.Check
          inline
          label="
          bachelor's degree"
          id="radio2"
          type="radio"
          name="position"
          value="
          bachelor's degree"
          checked={
            form.position ===
            `
          bachelor's degree`
          }
          onChange={(e) => handleEducationValue("position", e.target.value)}
        />
        <Form.Check
          inline
          label="master's Graduation"
          id="radio3"
          type="radio"
          name="position"
          value="master's Graduation"
          checked={form.position === "master's Graduation"}
          onChange={(e) => handleEducationValue("position", e.target.value)}
        />
        <Form.Check
          inline
          label="Ph.D. Graduation"
          id="radio4"
          type="radio"
          name="position"
          value="Ph.D. Graduation"
          checked={form.position === "Ph.D. Graduation"}
          onChange={(e) => handleEducationValue("position", e.target.value)}
        />
      </div>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button className={edu.mvpBtn} type="submit">
            Submit
          </button>
          <button
            className={edu.mvpBtn}
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

export default EducationForm;
