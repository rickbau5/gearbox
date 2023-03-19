import Head from 'next/head'
import { useRef, useCallback, useEffect, useState } from 'react'
import Data from "../../mock_data.json"

class Item {
  count = 0;
  readonly id: string
  readonly name: string

  constructor(id: string, name: string, count?: number) {
    this.id = id;
    this.name = name;
    if (count) this.count = count
  }
}

export default function Home() {
  function newBox() {
    var newBox = new Map();

    Data.forEach((d, index) => {
      let name = d.name;
      if (d.size && d.size !== "-") {
        name = `${d.size} ${d.name}`
      }

      let id = `${name}.${index}`

      newBox.set(id, new Item(id, name, d.quantity))
    })

    return newBox;
  }

  const [showingAll, setShowingAll] = useState(true)
  const searchInput = useRef<HTMLInputElement>(null)
  const [box, setBox] = useState(newBox())
  const [searchTerm, setSearchTerm] = useState("")

  const handleClickItem = (item: Item) => {
    item.count += 1
    box.set(item.id, item)
    setBox(new Map(box))
  }

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term)
  }

  const searchMatches = (item: Item) => {
    if (!searchTerm) {
      return showingAll || item.count > 0
    }

    return item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (showingAll || item.count > 0)
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSearchTerm("")
      searchInput.current?.blur()
      return
    }

    if (document.activeElement !== searchInput.current) {
      searchInput.current?.focus()
    }
  }, [])

  const handleClickShowingAll = (newState: boolean) => {
    setShowingAll(newState);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleKeyPress]);

  return (
    <>
      <Head>
        <title>gearbox</title>
        <meta name="description" content="Gearbox for your gear" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable-0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-300">
        <div className="flex flex-col w-full h-screen p-3 lg:w-1/2">
          <div id="search" className="p-3 h-1/6 flex flex-col justify-center items-center">
            <div className="w-full flex flex-row h-10">
              <input
                name="search-input"
                className="w-full h-full border-2 border-gray-200 outline-none bg-transparent p-1 pl-2 pr-2 rounded-full text-center placeholder-gray-400 focus:placeholder-opacity-0 focus:shadow-lg transition-shadow"
                placeholder="start typing..."
                value={searchTerm}
                onChange={e => handleSearchTerm(e.target.value)}
                ref={searchInput}
              />
            </div>
            <div className="flex flex-row w-1/2 text-center m-2">
              <div
                className={`flex flex-col w-full cursor-pointer underline justify-center`}
                onClick={() => handleClickShowingAll(!showingAll)}
              >
                { showingAll ? "All" : "Selected"}
              </div>
            </div>
          </div>
          <div id="results" className="lg:w-1/2 h-5/6 p-3 flex flex-col items-center content-center select-none overflow-y-auto">
            {Array.from(box, ([key, item]) => {
              if (!searchMatches(item)) {
                return null;
              }
              return (
                <div
                  key={key}
                  onClick={e => {
                    handleClickItem(item)
                    e.preventDefault()
                  }}
                  className="w-full flex flex-row justify-between bg-gray-200 rounded-sm pl-3 pr-2 p-2 mb-3 hover:shadow-md transition-shadow">
                  <p className="text-black w-5/6 align">
                    {item.name}
                  </p>
                  <span className="flex flex-col text-black w-1/6 justify-center content-center text-center">

                    {item.count}
                  </span>
                </div>
              )
            }).filter(el => el != null)}
          </div>
        </div>
      </main>
    </>
  )
}
