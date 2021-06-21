import styled from 'styled-components';

const Form = styled.form.attrs(props=>({
  onSubmit: (e) => e.preventDefault() && props.onSubmit()
}))`
  display: flex;
  flex-direction: column;
  gap: 13px;
  font-size: 20px;
  width: 100%;

  input {
    height: 58px;
    line-height: 58px;
    padding: 0 15px 0 15px;
    color: black;
  }

  button {
    height: 46px;
    font-weight: bold;
    background-color: #A328D6;
    cursor: pointer;
    color: white;
  }

  input, button{
    width: 100%;
    border-radius: 5px;
    border: none;
  }
`;

export default Form;