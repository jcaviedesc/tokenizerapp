// Load tokenizer.
const tokenizer = require('wink-tokenizer');
// Create it's instance.
const myTokenizer = tokenizer();

const COMMENTS_REGEX = /^#(.)*/gim
/**
 * 
 * @param {Array<Object>} regexInput Array{regex,tag}
 */
const addRegex = regexInput => {
  if (!Array.isArray(regexInput)) {
    throw new Error('parameter is not a Array!');
  }
  regexInput.forEach(({ regex, tag }) => {
    const reg = new RegExp(regex, 'gi', )
    console.log(reg)
    myTokenizer.addRegex(reg, tag ,'g');
  })
}
const runTokenizer = input => {
  return myTokenizer.tokenize(input);
}


const cleanComments = fileInput => fileInput.replace(COMMENTS_REGEX, "")

const Tokenizer = {
  addRegex,
  cleanComments,
  runTokenizer
}

export default Tokenizer;
