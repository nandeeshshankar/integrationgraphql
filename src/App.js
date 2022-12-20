import './App.css';
import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { GraphQLEditor } from 'graphql-editor';
import axios from 'axios';

const schemas = {
  pizza: `
    type Query{
      pizzas: [Pizza!]
    }
    `,
  pizzaLibrary: `
    type Pizza{
      name:String
    }
    `,
  };

function App() {
  const inputRef = useRef(null);
  
  const [mySchema, setMySchema] = useState({
    code: schemas.pizza,
    libraries: schemas.pizzaLibrary
  });
  const placeholderData = "Start writing the schema";
  let fileReader;
  let importFileName;

  function handleImportFileClick(event){
    inputRef.current.click();
  }

  const handleFileRead = (e) => {
    const content = fileReader.result;
    setMySchema({
      code: content,
      libraries: "",
    });
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    importFileName = file.name;
    //console.log("file name", file.name)
  };

  const handleExportFileClick = () => {
    const inputObj = {
      fileName: importFileName,
      data: mySchema.code
    }

    axios.post(`https://9842-103-68-20-69.ngrok.io/schema-data`, { inputObj })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    // console.log("mySchema.code", inputObj);
    // const fileData = JSON.stringify(mySchema.code);
    // const blob = new Blob([fileData], { type: "text/plain" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.download = "file.graphqls";
    // link.href = url;
    // link.click();
  }

  const newGraph = () => {
    setMySchema({
      code: '',
      libraries: ''
    });
  };

  console.log("mySchema", mySchema)

  return (
    <div className="App">
      <header className="App-header">
      <Container fluid>
          <Row>
            <Col md={1}>
              <br/>
              <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={e => handleFileChosen(e.target.files[0])}
              />
              <Button variant="primary" onClick={() => newGraph()}>Create New Graph</Button><br/><br/>
              <Button variant="primary" onClick={handleImportFileClick}>Import Existing</Button><br/><br/>
              <Button variant="primary" onClick={handleExportFileClick}>Export Graph</Button>
            </Col>
            <Col>
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
        diffSchemas={mySchema}
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
            </Col>
          </Row>  
        </Container>
      </header>
    </div>
  );
}

export default App;
