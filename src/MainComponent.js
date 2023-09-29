import React from 'react';
import DataField from './DataField';
import { DaEditor } from "./DaEditor"
import {TemplateHomePage} from "./TemplateHomePage"

function MainComponent() {
  return (
    <div>
      <h1>Arrastrar y Soltar Componentes</h1>
      <div style={{ display: 'flex' }}>
        {/* <DataField />
        <DaEditor /> */}

<DataField />
        <h1>hello again</h1>
        
      </div>
    </div>
  );
}

export default MainComponent;
