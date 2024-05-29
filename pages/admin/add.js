import React, { useContext } from "react";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid, Stack, TextField, Button, colors } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ProductContext } from "@/context/ProductContext";

const Add = () => {
  const { addProducts } = useContext(ProductContext);
  const [form, setForm] = React.useState({
    img: "https://m.media-amazon.com/images/I/71EcAtglToL._SY741_.jpg",
    title: "",
    category: "tshirts",
    size: "s",
    color: "",
    desc: "",
    price: "",
    availableQty: "",
  });

  const slug = `${form.title}+${form.size}+${form.category}+${
    form.color
  }+${Date.now()}`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  };

  // console.log(slug)

  const submitForm = async (e) => {
    e.preventDefault();
    addProducts(
      form.img,
      form.title,
      slug,
      form.category,
      form.size,
      form.color,
      form.desc,
      form.price,
      form.availableQty
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>
        {`
          footer {
            display: none;
          }
        `}
      </style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add a Product">
              <Stack spacing={3}>
                <TextField
                  value={form.img}
                  name="img"
                  label="Image"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  value={form.title}
                  name="title"
                  label="Title"
                  variant="outlined"
                  onChange={handleChange}
                />
                {/* <TextField
                  value={form.slug}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                  onChange={handleChange}
                /> */}
                <FormControl>
                  <InputLabel name="demo-simple-select-label">size</InputLabel>
                  <Select
                    labelname="category"
                    name="category"
                    value={form.category}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value={"tshirts"}>T-Shirts</MenuItem>
                    <MenuItem value={"hoodies"}>Hoodies</MenuItem>
                    <MenuItem value={"stickers"}>Stickers</MenuItem>
                    <MenuItem value={"mugs"}>Mugs</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel name="demo-simple-select-label">size</InputLabel>
                  <Select
                    labelname="size"
                    name="size"
                    value={form.size}
                    label="Size"
                    onChange={handleChange}
                  >
                    <MenuItem value={"s"}>S</MenuItem>
                    <MenuItem value={"m"}>M</MenuItem>
                    <MenuItem value={"l"}>L</MenuItem>
                    <MenuItem value={"xl"}>XL</MenuItem>
                    <MenuItem value={"xxl"}>XXL</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  value={form.color}
                  name="color"
                  label="Color"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  value={form.desc}
                  name="desc"
                  label="Description"
                  multiline
                  rows={4}
                  onChange={handleChange}
                />
                <TextField
                  value={form.price}
                  name="price"
                  label="Price"
                  onChange={handleChange}
                />
                <TextField
                  value={form.availableQty}
                  name="availableQty"
                  label="Available Qty"
                  onChange={handleChange}
                />
              </Stack>
              <br />
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                variant="contained"
                mt={2}
                onClick={submitForm}
              >
                Add
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;
