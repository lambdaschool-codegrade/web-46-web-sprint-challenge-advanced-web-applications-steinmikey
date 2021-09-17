import axiosWithAuth from "../helpers/axiosWithAuth";

const fetchColorService = () => {
  return axiosWithAuth()
    .get("/colors")
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      //return err?
    });
};

export default fetchColorService;
