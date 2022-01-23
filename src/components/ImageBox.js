import React from "react";
import styled from "styled-components";
import { AiOutlineFileImage } from "react-icons/ai";

const Image = styled.div`
  width: 400px;
  height: 400px;
  ${(props) =>
    props.photoURL
      ? "background-image: url(" + props.photoURL + ");"
      : `background-color: gray;`}
  background-position: center center;
  background-size: cover;
`;

const ImageBox = ({ photoURL }) => {
  return (
    <>
      {photoURL ? (
        <Image photoURL={photoURL}></Image>
      ) : (
        <div
          style={{
            width: "400px",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            color: "whitesmoke",
          }}
        >
          <AiOutlineFileImage size={"200px"} />
        </div>
      )}
    </>
  );
};

export default ImageBox;
