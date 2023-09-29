import styled from "styled-components";

export const GalleryList = styled.ul`
display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
    margin-top: 20px;
`;