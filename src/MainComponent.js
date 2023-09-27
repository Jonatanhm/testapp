import React from 'react';
import DataField from './DataField';
import { DaEditor } from "./DaEditor";

function MainComponent() {
  return (
    <div>
      <h1>Arrastrar y Soltar Componentes</h1>
      <div style={{ display: 'flex' }}>
        <DataField />
        <DaEditor />
      </div>
    </div>
  );
}

export default MainComponent;
