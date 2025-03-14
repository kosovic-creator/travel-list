'use client';
import { useState, useEffect } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    let sorted = [];

    if (sortBy === "input") {
      sorted = items;
    } else if (sortBy === "description") {
      sorted = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === "packed") {
      sorted = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    setSortedItems(sorted);
  }, [items, sortBy]);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id} // Ensure item.id is unique
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
