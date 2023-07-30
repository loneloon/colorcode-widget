import * as React from "react";
import { ReactElement } from "react";
import { PasswordWidget } from "./components/PasswordWidget/PasswordWidget";

function App(): ReactElement {
  return <PasswordWidget padHeightInCells={5} padWidthInCells={5} />;
}

export default App;
