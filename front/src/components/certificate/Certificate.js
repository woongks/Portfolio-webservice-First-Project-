import React, { useState, useContext } from "react";
import CertificateCard from "./CertificateCard";
import CertificateForm from "./CertificateForm";
import * as Api from "../../api";
import { CertificateContext } from "./CertificateContext";

function Certificate({ certificate, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const { certificates, setCertificates } = useContext(CertificateContext);
  async function handleDelete(e) {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      e.stopPropagation();
      try {
        await Api.delete("certificates", certificate.id);
        const idx = certificates.findIndex(
          (item) => item.id === certificate.id
        );
        certificates.splice(idx, 1);
        setCertificates([...certificates]);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <>
      {isEditing ? (
        <CertificateForm
          currentCertificate={certificate}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          portfolioOwnerId={certificate.userId}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Certificate;
