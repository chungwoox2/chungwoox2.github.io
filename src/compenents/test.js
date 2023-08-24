import React, { useState, useEffect } from "react";
import axios from "axios";
import ThemeList from "./themelist";

const Test = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/test")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(users);
  return (
    <div>
      <h1>User List</h1>
      <div>
        {users && users.length > 0 ? (
          users.map((item) => (
            <p key={item.id}>
              {item.id}번 {item.name}
            </p>
          ))
        ) : (
          <li>아무 데이터도 없음</li>
        )}
      </div>
    </div>
  );
};

export default Test;
