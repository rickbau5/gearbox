import { useRef, useCallback, useEffect, useState, ReactNode, createContext, RefObject, useContext, forwardRef } from 'react'
import React from 'react'
import ItemList from "@/components/ItemList"
import Input from "@/components/Input"

interface Item {
    readonly key: string
    readonly name: string,
    count: number,
}

interface InteractiveItemListProps {
    data: Item[]
    children?: ReactNode
}

class ItemListContextProps {
    searchTerm?: string
    handleSearchTerm: (term: string) => void

    constructor(
        handleSearchTerm: (term: string) => void,
        searchTerm?: string,
    ) {
        this.searchTerm = searchTerm;
        this.handleSearchTerm = handleSearchTerm;
    }
}

const ItemListContext = createContext<ItemListContextProps | null>(null);

const InteractiveItemListSearchBox = forwardRef(({}, ref: any) => {
    const context = useContext(ItemListContext)
    return (
        <>
            <Input
                name="search-input"
                className="transition-all ease-in-out border-b-2 border-white focus:border-orange text-white placeholder-light-blue outline-none bg-transparent focus:placeholder-opacity-0"
                style={{ width: "250px" }}
                placeholder="start typing to search..."
                value={context?.searchTerm}
                onChange={e => context?.handleSearchTerm(e)}
                ref={ref}
            />
        </>
    )
})

const InteractiveItemList = ({ data, children }: InteractiveItemListProps) => {
    function newBox() {
        var newBox = new Map();

        data.forEach((item, index) => {
            let name = item.name;

            let id = `${name}.${index}`

            newBox.set(id, item)
        })

        return newBox;
    }

    const searchInput = useRef<HTMLInputElement>(null)
    const [showingAll, setShowingAll] = useState(true)
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
        <ItemListContext.Provider value={
            new ItemListContextProps(handleSearchTerm, searchTerm)
        }>
            <InteractiveItemListSearchBox ref={searchInput}/>

            <div id="results" className="mt-5 flex flex-col items-center content-center select-none overflow-y-auto rounded-lg">
                <ItemList
                    items={Array.from(box.values())}
                    displayItem={searchMatches}
                    onClickItem={(item: Item) => { handleClickItem(item); return true }}
                />
            </div>
        </ItemListContext.Provider>
    );
}

export {
    InteractiveItemList,
    InteractiveItemListSearchBox
};