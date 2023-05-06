import React, { useEffect, useState } from "react";

const Design = () => {
  const designsInitial = [];
  const [designs, setDesigns] = useState(designsInitial);
  const getDesigns = async () => {
    const response = await fetch(
      "http://localhost:8000/api/design/fetchalldesigns",
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setDesigns(json);
  };

  useEffect(() => {
    getDesigns();
  }, []);

  return (
    <div className="bg-[#DF6589FF] md:px-[5vw] md:pt-[15vh] md:pb-[5vh] flex flex-wrap md:gap-[2.5vw] justify-between min-h-[100vh]">
      {designs && designs.length > 0
        ? designs.map((design) => {
            return (
              <img
                key={design._id}
                src={design.url}
                alt="image"
                className="md:w-[15vw] md:h-[15vw] md:rounded-lg md:hover:scale-110 duration-1000 w-[50vw] h-[25vh]"
              />
            );
          })
        : null}
    </div>
  );
};

export default Design;
