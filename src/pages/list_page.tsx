
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
      <div className="flex flex-col w-full">
        <div id="search" className="items-start mt-10 pb-3 last:pb-0">
          <div className="h-10">
              <input
              name="search-input"
              className="transition-all ease-in-out border-b-2 border-white focus:border-orange text-white placeholder-light-blue outline-none bg-transparent focus:placeholder-opacity-0"
              style={{width: "250px"}}
              placeholder="start typing to search..."
              value={searchTerm}
              onChange={e => handleSearchTerm(e.target.value)}
              ref={searchInput}
              />
          </div>
          <div>
              <span
              className="cursor-pointer underline text-orange"
              onClick={() => handleClickShowingAll(!showingAll)}
              >
              { showingAll ? "Showing All" : "Showing Selected"}
              </span>
          </div>
        </div>
        <div id="results" className="mt-5 flex flex-col items-center content-center select-none overflow-y-auto rounded-lg">
          <ItemList
              items={Array.from(box.values())}
              displayItem={searchMatches}
              onClickItem={(item: Item) => { handleClickItem(item); return true }}
              />
        </div>
      </div>
    </>
  )
}

export default ListPage;