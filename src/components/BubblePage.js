import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from "../services/fetchColorService";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    const colorIndex = colors.findIndex((color) => color.id === editColor.id);
    console.log(colorIndex);
    setColors(
      colors.map((color) => {
        if (color.id !== editColor.id) {
          return color;
        } else {
          return editColor;
        }
      })
    );
  };

  const deleteColor = (colorToDelete) => {
    setColors(
      colors.filter((color) => {
        return color !== colorToDelete;
      })
    );
  };

  useEffect(() => {
    fetchColorService().then((res) => {
      setColors(res);
    });
  }, []);

  return (
    <div className="container">
      <ColorList
        colors={colors}
        editing={editing}
        toggleEdit={toggleEdit}
        saveEdit={saveEdit}
        deleteColor={deleteColor}
      />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
