import { useState } from 'react';

import styles from './lib/home.module.css'
import Tokenizer from '../../services/tokenizer';

const HomePage = () => {
  const [input, setInput] = useState();
  const [result, setResult] = useState([])
  let file 
  let programFile

  const tokenizerHandler = () => {
    const clearInput = Tokenizer.cleanComments(input);
    console.log(input)
    console.log(clearInput)
    const result = Tokenizer.runTokenizer(clearInput)
    setResult(result)
  }

  const handleFileRead = (e) => {
    const content = file.result;
    const parseContent = JSON.parse(content);
    Tokenizer.addRegex(parseContent)
  };

  const handleProgramFileRead = (e) => {
    const content = programFile.result;
    setInput(content)
  }

  const handleFileChosen = (input, type) => {
    if (type === "regex") {
      file = new FileReader();
      file.onloadend = handleFileRead;
      file.readAsText(input);
    } else {
      programFile = new FileReader();
      programFile.onloadend = handleProgramFileRead;
      programFile.readAsText(input);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div>
          <span>Load custom regex json file</span>
          <input
            type="file"
            name="inputfileRegex"
            id="inputfileRegex"
            accept='.json'
            onChange={e => handleFileChosen(e.target.files[0], "regex")}
          />
        </div>
        <div>
          <span>Load program file</span>
          <input
            type="file"
            name="inputfileProgram"
            id="inputfileProgram"
            onChange={e => handleFileChosen(e.target.files[0])}
          />
        </div>
        <div>
          <textarea
            value={input}
            rows="4"
            cols="50"
            className={styles.input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        <button onClick={tokenizerHandler}>tokenizar</button>
      </div>
      <div className={styles.resultContainer}>
        <div className={styles.resultContainerItem}>
          <div><span>ID token</span></div>
          <div><span>Lexema</span></div>
          <div><span>Posicion</span></div>
        </div>
        {result.map((token, index) => (
          <div key={`${token.value}${token.tag}${index}`} className={styles.resultContainerItem}>
            <div>{token.tag}</div>
            <div>{token.value}</div>
            <div>{index}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
