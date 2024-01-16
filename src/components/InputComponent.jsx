import React, { useEffect, useRef, useState } from "react";
import data from "../demoData.json";
import DisplayList from "./DisplayList";
import ChipComponent from "./ChipComponent";

export default function InputComponent() {
  const [displayDropdown, setDisplayDropdown] = useState("none");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const getInitialList = (selectedUsers) => {
    return data.users
      .filter(
        (item) => !selectedUsers.find((subItem) => subItem.email === item.email)
      )
      .slice(0, 5);
  };
  const [displayList, setDisplayList] = useState(getInitialList(selectedUsers));
  const [search, setSearch] = useState("");
  const [highlightLastChip, setHighlightLastChip] = useState({
    state: false,
    times: 0,
  });
  const onInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim().length === 0) {
      setDisplayList(
        data.users
          .filter(
            (item) =>
              !selectedUsers.find((subItem) => subItem.email === item.email)
          )
          .slice(0, 5)
      );
    } else {
      var regex = new RegExp(e.target.value.trim(), "i");
      setDisplayList(
        data.users
          .filter(
            (item) =>
              !selectedUsers.find((subItem) => subItem.email === item.email)
          )
          .filter((item) => item.name.match(regex) || item.email.match(regex))
          .slice(0, 5)
      );
    }
  };
  const onSelect = (user) => {
    const newList = [...selectedUsers, user];
    setSelectedUsers(newList);
    setDisplayDropdown("none");
    setDisplayList(getInitialList(newList));
    setSearch("");
  };
  const onDelete = (user) => {
    const newList = selectedUsers.filter((item) => item.email !== user.email);
    setSelectedUsers(newList);
    setDisplayList(getInitialList(newList));
    setDisplayDropdown("none");
    setHighlightLastChip({ state: false, times: 0 });
  };
  const onKeyDown = (event) => {
    if (event.keyCode === 8 && search.length === 0) {
      if (highlightLastChip.state && highlightLastChip.times === 1) {
        if (selectedUsers.length > 0) {
          onDelete(selectedUsers[selectedUsers.length - 1]);
        }
      } else {
        setHighlightLastChip({ state: true, times: 1 });
      }
    }
  };
  return (
    <div className="container w-3/4 m-auto p-4 flex flex-col items-center overflow-visible">
      <h1 className="font-bold text-2xl text-blue-700 mb-16"> Pick Users </h1>
      <div className="container w-full border-b-4 border-blue-700 flex flex-row flex-wrap gap-2">
        {[
          ...selectedUsers.map((item, index) => {
            return (
              <ChipComponent
                item={item}
                onDelete={onDelete}
                highlight={
                  selectedUsers.length - 1 === index && highlightLastChip.state
                }
              />
            );
          }),
          <div className="relative w-1/4">
            <input
              id="inputBox"
              className="w-full h-14 focus:outline-none"
              placeholder="Add new user..."
              onFocus={() => {
                setDisplayDropdown("block");
              }}
              value={search}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
              autoComplete="off"
            />
            <DisplayList
              displayDropdown={displayDropdown}
              displayList={displayList}
              onSelect={onSelect}
            />
          </div>,
        ]}
      </div>
    </div>
  );
}
