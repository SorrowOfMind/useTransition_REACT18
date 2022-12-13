import React, { useState, useTransition } from 'react'

function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  const LIST_SIZE = 10000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value); //first render

    /*const l = [];
    for (let i = 0; i < LIST_SIZE; i++) { //simulate big data, complex task in the background - takes huge amount of time
      l.push(e.target.value)
    }
    setList(l); //set Input and setList will be combined into one call before the rerender
    */

    startTransition(() => { //second render
      const l = [];
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(e.target.value)
      }
      setList(l);
    })
 
  }

  return (
    <div className="App">
      <input type="text" value={input} onChange={handleChange} />
      {isPending ? "Loading" :
        list?.map((item, idx) => {
          return <div key={idx} >{item}</div>
        })}
    </div>
  )
}

export default App
