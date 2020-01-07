import React, { useEffect, useState } from "react";
import { ICourse } from "./types";
import { API_URL, subjectNames } from "./constants";
import { getOrKey } from "./utils";
import Course from "./Course";

enum LoadingState {
  Loading,
  Success,
  Failed
}

interface Props {
  code: string;
}

export const SubjectCourseList: React.FC<Props> = ({ code }) => {
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Loading
  );
  const [error, setError] = useState(new Error());

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/2020/sp/ua/${code}`);
        const payload = await res.json();
        setCourses(payload);
        setLoadingState(LoadingState.Success);
      } catch (err) {
        setError(
          new Error(
            `Error fetching subject ${getOrKey(code!, subjectNames)}: ${err}`
          )
        );
      }
    })();
  }, [code]);
  if (loadingState === LoadingState.Loading) {
    return <div>Loading...</div>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div> Error: {error.toString()} </div>;
  }
  if (courses.length === 0) {
    return <div> No courses available </div>;
  }
  return (
    <div>
      {courses
        .sort((a, b) => parseInt(a.deptCourseId) - parseInt(b.deptCourseId))
        .map((course: ICourse) => (
          <Course
            key={course.name}
            name={course.name}
            deptCourseId={course.deptCourseId}
            sections={course.sections}
          />
        ))}
    </div>
  );
};
