import React from "react";

export default function DisplayList({
  displayDropdown,
  displayList,
  onSelect,
}) {
  return (
    <div
      className="absolute top-16 shadow-xl rounded-xl"
      style={{
        minWidth: "30vw",
        maxHeight: "30vw",
        display: displayDropdown,
      }}
    >
      {displayList.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full p-2 flex flex-row justify-between items-center hover:cursor-pointer hover:bg-gray-300"
            onClick={() => {
              console.log("sdkjfbskdjfb");
              onSelect(item);
            }}
          >
            <img
              src={item.image}
              className="rounded-full w-12 h-12"
              alt={`${item.name}-profile`}
            />
            <h3 className="font-bold"> {item.name} </h3>
            <p className="text-gray-600"> {item.email} </p>
          </div>
        );
      })}
    </div>
  );
}
