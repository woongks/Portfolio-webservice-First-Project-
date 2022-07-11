import React, { useState, useEffect } from "react";
import { AwardContext } from "./AwardContext";
import * as Api from "../../api";
import Award from "./Award";
import AwardForm from "./AwardForm";
import aw from "../style/mvpCardBody.module.scss";

const Awards = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
  }, [portfolioOwnerId]);

  return (
    <AwardContext.Provider value={{ awards, setAwards }}>
      <div className={aw.mvpContainer}>
        <div className={aw.mvpContaineritle}>Award</div>
        {awards.map((award) => (
          <Award key={award?.userId} award={award} isEditable={isEditable} />
        ))}
        {isEditable && (
          <div>
            <button className={aw.mvpBtn} onClick={() => setIsAdding(true)}>
              +
            </button>
          </div>
        )}
        {isAdding && (
          <AwardForm
            portfolioOwnerId={portfolioOwnerId}
            setIsAdding={setIsAdding}
          />
        )}
      </div>
    </AwardContext.Provider>
  );
};

export default Awards;
