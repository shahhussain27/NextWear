import { useContext } from "react";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/AllProducts";
import { ProductContext } from "@/context/ProductContext";

const Allproducts = () => {
  const { tshirt, hoodies, mugs, stickers } = useContext(ProductContext);

  // console.log(tshirt, hoodies, mugs, stickers);
  // console.log(tshirt, hoodies, mugs, stickers )
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
            <ProductPerfomance
              tshirt={tshirt}
              hoodies={hoodies}
              mugs={mugs}
              stickers={stickers}
            />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Allproducts;
