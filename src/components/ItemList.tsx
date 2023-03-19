interface Item {
    readonly key: string,
    readonly count: number,
    readonly name: string
}

interface ItemListProps {
    items: Item[],
    onClickItem?(item: Item): boolean,
    displayItem?(item: Item): boolean
}

const ItemList = ({ items, onClickItem, displayItem }: ItemListProps) => {
    return (
        <>
            {items.filter((item) => displayItem ? displayItem(item) : true).map((item) => {
              return (
                <div
                  key={item.key}
                  onClick={e => {
                    let preventDefault = onClickItem ? onClickItem(item) : false;
                    if (preventDefault) e.preventDefault()
                  }}
                  className="w-full flex flex-row justify-between bg-light-blue pl-3 pr-2 p-2 mb-3 last:mb-0 hover:shadow-md transition-shadow hover:shadow-orange cursor-pointer">
                  <p className="w-5/6 text-blue">
                    {item.name}
                  </p>
                  <span className=" w-1/6 text-blue text-center">
                    {item.count}
                  </span>
                </div>
              )
            }).filter(el => el != null)}
        </>
    )
}

export default ItemList;