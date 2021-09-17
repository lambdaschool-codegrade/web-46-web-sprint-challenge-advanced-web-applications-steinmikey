import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from "../services/fetchColorService";
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
      .put(`/colors/${editColor}`, editColor)
      .then((res) => {
        console.log(res);
        setColors(
          colors.map((color) => {
            if (color.id !== res.data.id) {
              return color;
            } else {
              return res.data;
            }
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`, colorToDelete)
      .then((res) => {
        console.log(res);
        setColors(
          colors.filter((color) => {
            return color.id !== parseInt(res.data);
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
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
