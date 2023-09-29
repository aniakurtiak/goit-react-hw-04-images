import styled from "styled-components";

export const SearchForm = styled.form`
display: flex;
    justify-content: center;
    max-width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 5px 15px;
    color: #ffffff;
    background-color: rgb(53, 90, 150);
    border: none;
    border-radius: 6px;
`;

export const Input = styled.input`
min-width: 400px;
background-color: #ffffff;
font-size: 16px;
padding: 5px 10px;
border: none;
 border-radius: 4px;
`;

export const SearchButton = styled.button`
padding: 10px 15px;
    font-size: 14px;
    color: #ffffff;
    background-color: rgb(53, 90, 150);
    border: none;
    cursor: pointer;

`