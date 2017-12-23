# Scheme REPL Interpreter in Javascript

### Overview
##### The language
The first step to building an intepreter is to precisely define the syntax and semantics of the langauge to be interpreted (i.e. the source language). The following table describes the subset of Scheme to be handled by our interpreter:

| Statement | Examples (comma separated) | Syntax | Semantics |
| ------ | ------ | ------ | ------ |
| Number | 1, 1.5, (- 1  ), (+ .03) | A is a sequence of consecutive characters containing no whitespace, at least one digit, and at most one decimal. Further, negative numbers are denoted by an open parenthesis, followed by a negative symbol, a number, followed by a close parenthesis. The same holds for positive numbers, except the negative symbol is replaced with a positive symbol. | Numbers in our Scheme language are effectively [real numbers] and are represented by Javascript floats.|
| Operator | +, -, /, * | An operator is denoted by exactly one of the aforementioned symbols and should separated from other symbols by whitespace, numbers, or parentheses. |  An operator denotes the operation to be performed on the arguments that follow the operator. The plus symbol denotes addition, the minus symbol denotes subtraction, the forward slash denotes division, and the star denotes multiplication. |
| Expression |  (+ 1 3), ( / 100 (-25) ( * 2 ( * 2 1))) |  Every expression begins with an open parenthesis, followed by an operator, then at least one argument and finally a close parenthesis. The arguments may be numbers or expressions. |

Our version of Scheme is a [normal order] language, meaning that arguments in expressions are not evaluated until they are needed. Further, arguments are evaluated in order of left to right by means of applying the operation indicated to the two first two arguments. An example of such evaluation is illustrated below:

> step 0: (/ 100 2 (- 25 5) (/ 10 2))

> step 1: (/ 100 (- 25 5) (/ 10 2))

> step 2: (/ 50 (- 5) (/ 10 2))

> step 3: (/ -10 (/ 10 2))

> step 4: (/ -10 5)

> result: -2


##### The parser
The job of the parser is to translate a sequence of tokens that comprise the source program into an abstract syntax tree in the target language.

The following diagram depicts a high level illustration of the logic behind the parser. 
###### Parser Diagram
![Alt text](https://rawgit.com/rosori01/lispy/scratchboard/SchemeParserArith.svg)


### Try it yourself

First, install git and clone this repository.
Secondly, install node.js.
Finally, from your terminal, enter the following command:
> node repl.js

Then proceed to enter Scheme expressions following the syntactic and semantic rules defined above.

[real numbers]: <https://en.wikipedia.org/wiki/Real_number>
[normal]: <https://mitpress.mit.edu/sicp/full-text/sicp/book/node85.html>
