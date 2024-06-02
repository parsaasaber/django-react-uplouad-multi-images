import logo from "./logo.svg";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const txtName = useRef();
  const txtDescription = useRef();
  const flImages = useRef();
  const [products, setProduct] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/app/index/").then((result) => {
      setProduct(result.data.products);
    });
    setUpdate(false);
    txtName.current.value = "";
    txtDescription.current.value = "";
  }, [update]);

  return (
    <>
      Name: <input type="text" ref={txtName} />
      <br />
      <br />
      Description: <textarea name="description" ref={txtDescription}></textarea>
      <br />
      <br />
      Images: <input type="file" multiple ref={flImages} />
      <br />
      <br />
      <input
        type="button"
        value="Submit"
        onClick={() => {
          let formData = new FormData();
          let files = flImages.current.files;
          for (let file of files) {
            formData.append("images", file);
          }
          formData.append("name", txtName.current.value);
          formData.append("description", txtDescription.current.value);
          axios
            .post("http://127.0.0.1:8000/app/save/", formData, {
              headers: "Content-Type: multipart/form-data",
            })
            .then(() => {
              setUpdate(true);
            })
            .catch(() => {});
        }}
      />
      <br />
      <br />
      <table class="w3-table w3-striped" border="1">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Images</th>
        </tr>
        {products.map((product) => (
          <tr>
            <td>{product.name}</td>
            <td>{product.description}</td>
            {product.images.map((image) => (
              <img src={image} width="50" />
            ))}
          </tr>
        ))}
      </table>
    </>
  );
}

export default App;
