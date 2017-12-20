# Scheme REPL Interpreter in Javascript

### Overview

##### The parser
*Source language:* **Scheme**
*Target language:* **Javascript**

Before implementing the parser, we must first explicitly define all the allowable syntactic forms in the source language. Further, we must also explicitly define how these syntactic forms will be represented in the target language; we refer to said representation as an abstract syntax tree. The job of the parser is to translate a sequence of tokens that comprise the source program into an abstract syntax tree in the target language.

The following diagram depicts a high level illustration of the logic behind the parser. 
![Alt text](https://rawgit.com/rosori01/lispy/scratchboard/SchemeParserArith.svg)
