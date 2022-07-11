import React, { useEffect, useState } from "react";
import { CertificateContext } from "./CertificateContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateForm from "./CertificateForm";
import certi from "../style/mvpCardBody.module.scss";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("certificatelist", portfolioOwnerId).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <CertificateContext.Provider value={{ certificates, setCertificates }}>
      <div className={certi.mvpContainer}>
        <div className={certi.mvpContaineritle}>Certification</div>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate?.id}
            certificate={certificate}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <div>
            <button className={certi.mvpBtn} onClick={() => setIsAdding(true)}>
              +
            </button>
          </div>
        )}
        {isAdding && (
          <CertificateForm
            portfolioOwnerId={portfolioOwnerId}
            setIsAdding={setIsAdding}
          />
        )}
      </div>
    </CertificateContext.Provider>
  );
}

export default Certificates;
