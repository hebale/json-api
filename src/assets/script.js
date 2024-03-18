import CodeEditor from "../../public/editor.js";

const data = {
  method: "POST",
  name: "/user",
  data: [{ name: "윤종규", gender: "남", age: 35 }],
};

const headers = {
  "Content-Type": "application/json",
};

const getJson = async () => {
  try {
    const response = await fetch("/api/db?name=/user", {
      method: "GET",
      headers,
    });
    const data = response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

const postJson = async () => {
  try {
    const response = await fetch("/api/db", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const patchJson = async () => {
  try {
    const response = await fetch("/api/db", {
      method: "PATCH",
      headers,
      body: JSON.stringify({ ...data, modified: true }),
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteJson = async () => {
  try {
    const response = await fetch("/api/db", {
      method: "DELETE",
      headers,
      body: JSON.stringify({ name: "/user" }),
    });
  } catch (err) {
    console.log(err);
  }
};
