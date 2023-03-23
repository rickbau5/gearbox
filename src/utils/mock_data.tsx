import Data from "../../mock_data.json"

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

const MockData = Data.map((d, index) => {
  let name = d.name;
  let id = `${name}.${index}`
  if (d.size && d.size !== "-") {
      name = `${d.size} ${d.name}`
  }

  return new Item(id, name, d.quantity)
})

export default MockData;