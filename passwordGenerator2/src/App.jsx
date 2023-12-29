import { useCallback, useEffect, useState, useRef } from "react"

function App() {

  const [length, setLength] = useState(6)
  const [number, setNumber] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [uppercase, setUppercase] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {

    let result = ''
    let string = 'abcdefghijklmnopqrstuvwxyz'

    if(characters){
      string += '!@#$%^&*()_+'
    }

    if(number){
      string+= '0123456789'
    }

    if(uppercase){
      string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * string.length) + 1
      result += string.charAt(char)
    }

    setPassword(result)

  }, [length, number, characters, uppercase, setPassword])

  useEffect(() => {
    generatePassword()
  }, [length, number, characters, uppercase])

  const copyTheText = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="bg-white max-w-4xl mt-3 m-auto rounded-md p-5">
        <h1 className="text-2xl text-center">Password Generator</h1>
        <div className="flex">
          <input
          placeholder="password"
          className="bg-gray-600 text-white w-full mt-4 p-3 rounded-l-lg outline-none"
          readOnly
          value={password}
          />
          <button onClick={copyTheText} className="bg-blue-600 px-5 mt-4 py-3 rounded-r-lg hover:bg-blue-700 transition duration-300 ease-in-out">Copy</button>
        </div>
        <div className="flex justify-around mt-3">
          <div>
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {setLength(e.target.value)}}
            ref={passwordRef}
            />
            <label>length({length})</label>
          </div>
          <div>
            <input 
            type="checkbox" 
            defaultChecked={number}
            onChange={() => {setNumber((prev) => !prev)}}
            />
            <label>number</label>
          </div>
          <div>
            <input 
            type="checkbox" 
            onChange={() => {setCharacters((prev) => !prev)}}
            />
            <label>characters</label>
          </div>
          <div>
            <input 
            type="checkbox"
            onChange={() => {setUppercase((prev) => !prev)}} 
            />
            <label>uppercase</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
