
import React from 'react'
import { useRef, useCallback, useEffect, useState } from 'react'
import Data from "../../mock_data.json"
import ItemList from "../components/ItemList"

class Item {
  count = 0;
  readonly key: string
  readonly name: string

  constructor(key: string, name: string, count?: number) {
    this.key = key;
    this.name = name;
    if (count) this.count = count
  }
}

interface ListPageProps {
    className?: string
}

const ListPage = ({ className }: ListPageProps) => {
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
    box.set(item.key, item)
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
        <div id="search" className="h-1/6 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center w-full h-10">
            <input
            name="search-input"
            className="transition-all ease-in-out focus:w-full h-full border-b-2 border-white text-white placeholder-light-blue outline-none bg-transparent p-1 pl-2 pr-2 text-center focus:placeholder-opacity-0"
            placeholder="start typing..."
            value={searchTerm}
            onChange={e => handleSearchTerm(e.target.value)}
            ref={searchInput}
            />
        </div>
        <div className="text-center pt-3">
            <p
            className="cursor-pointer underline text-orange"
            onClick={() => handleClickShowingAll(!showingAll)}
            >
            { showingAll ? "Showing All" : "Showing Selected"}
            </p>
        </div>
        </div>
        <div id="results" className="h-5/6 p-3 flex flex-col items-center border-white content-center select-none overflow-y-auto border-2 rounded-lg">
        <ItemList
            items={Array.from(box.values())}
            displayItem={searchMatches}
            onClickItem={(item: Item) => { handleClickItem(item); return true }}
            />
        </div>
    </>
  )
}

export default ListPage;