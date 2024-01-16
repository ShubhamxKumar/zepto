import React from "react";

export default function ChipComponent({ item, onDelete, highlight }) {
  return (
    <div
      className="s-1/4 m-2 flex flex-row items-center bg-gray-300 pr-2"
      style={{
        gap: "10px",
        borderRadius: "2rem",
        border: highlight && "2px solid blue",
      }}
    >
      <img
        src={item.image}
        className="rounded-full w-10 h-10"
        alt={`${item.name}-profile`}
      />
      <h3 className="font-bold"> {item.name} </h3>
      <p
        className="text-gray-600 hover:cursor-pointer"
        onClick={() => {
          onDelete(item);
        }}
      >
        {" "}
        &#x2715;{" "}
      </p>
    </div>
  );
}
