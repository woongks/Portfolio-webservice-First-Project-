import React, { useState, useContext } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { ProjectContext } from "./ProjectContext";
import pro from "../style/mvpCardBody.module.scss";

const ProjectForm = ({
  portfolioOwnerId,
  setIsAdding,
  currentProject,
  setIsEditing,
}) => {
  const [form, setForm] = useState({
    title: currentProject?.title ? currentProject.title : "",
    description: currentProject?.description ? currentProject.description : "",
    fromDate: currentProject?.fromDate ? currentProject.fromDate : "",
    toDate: currentProject?.toDate ? currentProject.toDate : "",
  });
  const { projects, setProjects } = useContext(ProjectContext);

  const handleProjectValue = (name, value) => {
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
        await Api.post("project/create", {
          userId: userId,
          title: form.title,
          description: form.description,
          fromDate: form.fromDate,
          toDate: form.toDate,
        });
        setIsAdding(false);
        let res = await Api.get("projectlist", userId);
        setProjects(res.data);
        // .then(setIsAdding(false))
        // .then(
        //   setProjects([
        //     ...projects,
        //     {
        //       userId,
        //       title: form.title,
        //       description: form.description,
        //       fromDate: form.fromDate,
        //       toDate: form.toDate,
        //     },
        //   ])
        // );
      } else if (setIsEditing) {
        await Api.put(`projects/${currentProject.id}`, {
          userId: currentProject.userId,
          title: form.title,
          description: form.description,
          fromDate: form.fromDate,
          toDate: form.toDate,
        });
        setIsEditing(false);
        let res = await Api.get("projectlist", currentProject.userId);
        setProjects(res.data);
        /////////////////////////////////////////////////////////////////////////////
        // const idx = projects.findIndex((card) => card.id !== projects.id);
        // projects[idx] = {
        //   userId: currentProject.userId,
        //   id: currentProject.id,
        //   title: form.title,
        //   description: form.description,
        //   fromDate: form.fromDate,
        //   toDate: form.toDate,
        // };
        // setProjects([...projects]);
        /////////////////////////////////////////////////////////////////////////
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="proejct"
          value={form.title}
          onChange={(e) => handleProjectValue("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="description"
          value={form.description}
          onChange={(e) => handleProjectValue("description", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicFromDate" className="mt-3">
        <Form.Control
          type="date"
          placeholder="fromDate"
          value={form.fromDate}
          onChange={(e) => handleProjectValue("fromDate", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicToDate" className="mt-3">
        <Form.Control
          type="date"
          placeholder="endDate"
          min={form?.fromDate}
          value={form.toDate}
          onChange={(e) => handleProjectValue("toDate", e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button className={pro.mvpBtn} type="submit">
            Submit
          </button>
          <button
            className={pro.mvpBtn}
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

export default ProjectForm;
