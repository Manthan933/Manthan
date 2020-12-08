import React from "react";
import { Container } from "@material-ui/core";
import FloatingButton from "../../components/FloatingButtons/TestButton";
import { getClass } from "../../actions/actions";

export default function Classroom(props) {
  const { classCode, admin } = props.match.params;
  const [Tests, setTests] = React.useState(["Test1", "test2"]);
  const [Class, setClass] = React.useState({});
  React.useEffect(() => {
    getClass(classCode, setClass);
  }, [classCode]);
  React.useEffect(()=>{

  }, [classCode])

  if (admin === "true") console.log(admin);
  return (
    <Container>
      <div>
        <h3>{Class.name}</h3>
        <h5>{Class.instructor}</h5>
        <p>{Class.code}</p>
      </div>
      {Tests.map((Test) => {
        return <h3 key={Test}>{Test}</h3>;
      })}
      {admin === "true" ? (
        <FloatingButton href={`/${Class.code}/`} text='Create Test' />
      ) : null}
    </Container>
  );
}
