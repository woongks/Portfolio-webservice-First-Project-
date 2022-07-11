import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Career from "./Career";
import CareerForm from "./CareerForm";
import car from "../style/mvpCardBody.module.scss";
import { CareerContext } from "./CareerContext";

function Careers({ portfolioOwnerId, isEditable }) {
  const [careers, setCareers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "careerlist/유저id"로 GET 요청하고, response의 data로 careers를 세팅함.
    Api.get("careerlist", portfolioOwnerId).then((res) => setCareers(res.data));
  }, [portfolioOwnerId]);

  return (
    <CareerContext.Provider value={{ careers, setCareers }}>
      <div className={car.mvpContainer}>
        <div className={car.mvpContaineritle}>Career</div>
        {careers.map((career) => (
          <Career
            key={career?.id}
            career={career}
            setCareers={setCareers}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <div>
            <button className={car.mvpBtn} onClick={() => setIsAdding(true)}>
              +
            </button>
          </div>
        )}
        {isAdding && (
          <CareerForm
            portfolioOwnerId={portfolioOwnerId}
            setIsAdding={setIsAdding}
          />
        )}
      </div>
    </CareerContext.Provider>
  );
}

export default Careers;
