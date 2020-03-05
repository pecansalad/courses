import React from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import SchoolSubjectsList from "./SchoolSubjectsList";
import { useSelector } from "react-redux";
import { RootState } from "./duck";

const SchoolPage: React.FC = () => {
  const { school: code, semester } = useParams();
  const schools = useSelector((state: RootState) => state.core.schools);
  const history = useHistory();

  if (code === undefined || semester === undefined) {
    history.push("/");
    return (
      <div>
        No school selected! Please go <Link to="/"> back</Link>
      </div>
    );
  } else {
    const school = schools[code];
    return (
      <div>
        <h2> {school.name || code}</h2>
        <SchoolSubjectsList code={code} school={school} semester={semester} />
      </div>
    );
  }
};

export default SchoolPage;