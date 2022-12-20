import React, { useState } from 'react';
import { GraphQLEditor } from 'graphql-editor';

export const GraphQLEditorComponent = (props) => {

const [mySchema, setMySchema] = useState({
  code: props.schemaContent.code,
  //code: '',
  libraries: props.schemaContent.library
});
const placeholderData = "Start writing the schema";

return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor placeholder={placeholderData}
        schema={mySchema}
        setSchema={(props)=> {
            console.log("setSchema called", props);
            setMySchema(props);
        }}
        
        readonly={false}
        //diffSchemas={oldSchema: mySchema; newSchema: mySchema}
        activePane="diagram"
        //state={pane: ActivePane}
        onStateChange={()=>{
          console.log("onStateChange called")
        }}
        
        onTreeChange={(tree)=> {
            console.log("onTreeChange called")
        }}
      />
    </div>
  );
};