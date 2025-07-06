import React,{useState,useEffect,useContext} from "react";
import { evaluate  } from 'mathjs';
import nerdamer from 'nerdamer';
import 'nerdamer/Algebra.js';
import 'nerdamer/Solve.js';
import {the} from './App'
export default function Calculator(){
const theme = useContext(the);
const [Act,SetAct] = useState('one');
const [Page,SetPage] =useState('first');
const [inp,SetInp] = useState('');
const [res,SetRes] = useState('');


const key =(k)=>{
SetInp( prev => prev + k);
}
const resultat = () => {
  try {
    const inequalityMatch = inp.match(/(.+?)(<=|>=|<|>)(.+)/);

    if (inequalityMatch) {
      const [, left, operator, right] = inequalityMatch;

      const simplified = nerdamer(`${left}-(${right})`).expand();

      const variables = simplified.variables();

      if (variables.length === 0) {
        SetRes("Немає змінних для розвʼязання нерівності.");
        return;
      }

      const variable = variables[0];

      const boundary = nerdamer.solve(`${simplified}=0`, variable);

      if (!boundary || boundary.length === 0) {
        SetRes("Не вдалося знайти розвʼязок нерівності.");
        return;
      }

      
      const operatorMap = {
        '>=': '≥',
        '<=': '≤',
        '>': '>',
        '<': '<'
      };

      const opPretty = operatorMap[operator] || operator;


      const solutionStr = Array.isArray(boundary) ? boundary.join(', ') : boundary.toString();

      SetRes(`${variable} ${opPretty} ${solutionStr}`);
      return;
    }

    else if (inp.includes('=') && !inp.includes('>=') && !inp.includes('<=') && !inp.includes('>') && !inp.includes('<')) {
      const result = nerdamer.solveEquations(inp);
      SetRes(Array.isArray(result) ? result.join(', ') : result.toString());
      return;
    }

    else {
      const result = evaluate(inp);
      SetRes(result.toString());
    }

  } catch (error) {
    console.error(error);
    SetRes("Невірний вираз або не підтримується.");
  }
};


const backspace = () => {
  SetInp(prev => prev.slice(0, -1));
}
  const visualFormat = (text) => {
    return text
      .replace(/sqrt\(/g, '√')     
      .replace(/\)/g, '')           
      .replace(/pi/g, 'π')          
      .replace(/\*/g, '×') 
     .replace(/(\d+)\s*deg/g, '($1 * pi / 180)')  
      .replace(/>=/g, '≥')
      .replace(/<=/g, '≤')          
      .replace(/\//g, '÷');         
  };
return(
<>
<main className=" ">
    <h1 className="font-bold text-5xl text-center  hCal">Calculator</h1>
    <section className="relative top-25 left-10"> 
<input value={inp} onChange={e => SetInp(e.target.value)} type="text" placeholder="Please enter your math problem" className="border-2 rounded-lg text-xl " />
  <button onClick={resultat}
            className={`w-28 h-10 font-bold rounded-lg cursor-pointer ml-2 transition duration-300  ${
              theme === 'light'
                ? ' bg-stone-950 text-white hover:bg-stone-700'
                : ' bg-white text-black h'
            }`}
          >
            Calculate
          </button>
         <button onClick={backspace} className={`w-10 h-10 font-bold rounded-lg cursor-pointer ml-2 transition duration-300 relative left-2  ${
              theme === 'light'
                ? ' bg-stone-950 text-white hover:bg-stone-700'
                : ' bg-white text-black h'
            }`}>⌫</button>
    </section>
   
</main>
<main>
    <h2 className="font-bold text-xl hY">Your math problem:{visualFormat(inp)}</h2>
    <h2 className="font-bold text-2xl hY">Result:{res}</h2>
</main>

<main className="sm:absolute sm:left-150 sm:top-40 shadow-lg rounded-lg w-80 h-80 relative left-20 top-20 md:left-120 lg:left-150 ">
    <h1 className="font-bold text-2xl text-center hk ">Keyboard</h1>
    <div className="flex shadow-lg rounded-xl w-50 h-10 kb">
        <button className={`${Act ==='one'?"bts bg-cyan-500 rounded-xl font-semibold   ":"bts  "}`} onClick={()=>SetAct('one')} >Standard</button>
        <button className={`${Act ==='two'?" bg-cyan-500 rounded-xl font-semibold":""}`} onClick={()=>SetAct('two')}>Scientific</button>
    </div>
    <section>

        <div className={`${Act === 'one'?'block':'hidden'}`}>
           <span className={`${Page === 'first'?'hidden':"absolute top-45 left-2 cursor-pointer"}`} onClick={()=>SetPage('first')}>&#8592;</span>
           <span className={`${Page ==='second'?'hidden':"absolute top-45 left-74 cursor-pointer"}`} onClick={()=>SetPage('second')}> &#8594;</span>
           <div className={`${Page ==='first'?" grid grid-cols-4 gap-4 shadow-lg rounded-lg w-60 h-47 relative left-10 text-center top-5":'hidden'}`}>
            <div  onClick={()=>key('1')} className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out cursor-pointer" >1</div>
             <div onClick={()=>key('2')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">2</div>
             <div onClick={()=>key('3')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">3</div>
             <div onClick={()=>key('+')} className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">+</div>
             <div onClick={()=>key('4')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">4</div>
              <div onClick={()=>key('5')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">5</div>
              <div onClick={()=>key('6')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">6</div>
               <div onClick={()=>key('-')} className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">-</div>
              <div onClick={()=>key('7')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">7</div>
             <div onClick={()=>key('8')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">8</div>
                <div onClick={()=>key('9')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">9</div>
                   <div onClick={()=>key('*')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">*</div>
                <div onClick={()=>key('0')} className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">0</div>
                      <div onClick={()=>key('.')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">.</div>
                <div onClick={()=>key('=')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">=</div>
            <div onClick={()=>key('/')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">/</div>
               
               
                </div>
                
          

               
              
           <div className={`${Page === 'second'?"grid grid-cols-3 gap-4 shadow-lg rounded-lg w-60 h-47 relative left-10 text-center top-5":'hidden'}`}>
                <div onClick={()=>key('(')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">(</div>
                <div onClick={()=>key(')')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">)</div>
              
              <div onClick={()=>key('<')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">&lt; </div> 
               <div onClick={()=>key('>')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">&gt;</div>
              <div onClick={()=>key('>=')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">≥</div>
              <div onClick={()=>key('<=')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">≤</div>
            
                <div onClick={()=>key('^')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">^</div>
                <div onClick={() => key('sqrt()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">√</div>
                <div onClick={() => key('pi')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">π</div>
                <div onClick={() => key('e')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">e</div>
               </div>
        </div>
    </section>
    <section>
        
        <div className={`${Act === 'two'?'block':'hidden'}`}>
           <div className="grid grid-cols-4 gap-4 relative shadow-lg rounded-lg w-60 h-47 left-10 text-center top-5"> 
            <div onClick={()=>key('sin()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">sin</div>
            <div onClick={()=>key('cos()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">cos</div>
            <div onClick={()=>key('tan()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">tan</div>
                        <div  onClick={()=>key('log()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">log</div>
              <div  onClick={()=>key('x')} className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">x</div>
                <div  onClick={()=>key('y')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">y</div>
                  <div  onClick={()=>key('z')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">z</div>

            <div  onClick={()=>key('ln()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">ln</div>
            <div onClick={()=>key('exp()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">exp</div>
            <div onClick={()=>key('abs()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">abs</div>
            <div onClick={()=>key('mod()')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">mod</div>
            <div onClick={()=>key('!')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">!</div>
            <div onClick={()=>key('sum(i,i,)')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">∑</div>
            <div onClick={()=>key('sum(i,i,)')}className="hover:shadow-lg hover:rounded-lg hover:font-black hover:scale-125 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out">∏</div>
          </div>
        </div>
    </section>
   
</main>

</>
);

}