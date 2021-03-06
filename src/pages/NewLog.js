import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import UserContext from "../contexts/UserContext";

import Form from "../components/Form";

import Config from "../helper_functions/Config";

class FormState {
  constructor() {
    this.value = "";
    this.description = "";
  }
}

export default function NewLog() {
  const { user, logs, setLogs } = useContext(UserContext);
  const [formState, setFormState] = useState(new FormState());
  const [isInteractive, setIsInteractive] = useState(true);

  const { logType } = useParams();
  const history = useHistory();

  const submitLog = () => {
    setIsInteractive(false);
    const path =
      logType === "expenditure" ? "/logs/expenditure/new" : "/logs/earning/new";
    const body = { ...formState };
    let valString = Number(body.value).toFixed(2);
    valString = valString.replace(/[,.]/, "");
    const valInt = parseInt(valString);
    body.value = valInt;

    const config = new Config(user.token);

    axios
      .post("https://my-wallet-vel.herokuapp.com" + path, body, config)
      .then(({ data: newLog }) => {
        setLogs([newLog, ...logs]);
        history.push("/");
      })
      .catch((error) => {
        alert(error);
        setIsInteractive(true);
      });
  };

  return (
    <PageWrapper>
      <Header>
        {logType === "earning" ? <p>Nova entrada</p> : <p>Nova saída</p>}
      </Header>
      <Form customSubmit={submitLog}>
        <input
          required
          disabled={!isInteractive}
          type="number"
          min="0"
          placeholder="Valor"
          step="0.01"
          value={formState.value}
          onChange={(e) => {
            formState.value = e.target.value;
            setFormState({ ...formState });
          }}
        />
        <input
          required
          disabled={!isInteractive}
          type="text"
          placeholder="Descrição"
          value={formState.description}
          onChange={(e) => {
            formState.description = e.target.value;
            setFormState({ ...formState });
          }}
        />
        <button disabled={!isInteractive}>
          {logType === "earning" ? <p>Salvar entrada</p> : <p>Salvar saída</p>}
        </button>
      </Form>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 25px 25px 16px 25px;
  min-height: 100vh;
  width: 100%;

  header {
    margin-bottom: 35px;
  }

  form {
    margin-bottom: 36px;
  }
`;

const Header = styled.header`
  font-size: 26px;
  font-weight: bold;
  line-height: 30px;
  width: 100%;
  height: 30px;
`;
