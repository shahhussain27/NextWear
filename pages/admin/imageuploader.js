import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";

const Imageuploader = () => {
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>image uploader</FullLayout>
    </ThemeProvider>
  );
};

export default Imageuploader;
