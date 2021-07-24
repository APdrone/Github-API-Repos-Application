/* Variables */
const btn = document.getElementsByTagName("button");
const userInput = document.getElementById("userid");

//setting body background color
document.body.style.backgroundColor = "#ccc";

/* Common method to create DOM elements */

function createElementDOM(
  elType,
  classNames,
  attributeNames = {},
  visibleText
) {
  const inputDiv = document.createElement(elType);
  inputDiv.classList.add(...classNames);

  for (const [key, value] of Object.entries(attributeNames)) {
    inputDiv.setAttribute(key, value);
  }
  inputDiv.innerHTML = visibleText;
  return inputDiv;
}

/* Common Async fetch function  */

async function fetchAPI(url, callbck) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status}`);
    const data = await resp.json();
    callbck(data);
  } catch (error) {
    rowDiv.innerHTML = "";
    alert("Error in fetching  data , Getting " + error);
  }
}

/*  heading */
const h1Div = createElementDOM(
  "h1",
  ["display-2", "text-center", "mb-3"],
  {},
  "Github API Repos"
);

/*  User input field  and Search Button*/

const formDiv = createElementDOM(
  "form",
  ["form-inline", "justify-content-center"],
  {},
  ""
);

const DivEl = createElementDOM(
  "div",
  ["form-group", "mx-sm-3", "mb-2"],
  {},
  ""
);

const labelDiv = createElementDOM(
  "label",
  ["sr-only"],
  { for: "userid" },
  "Username"
);

const inputDiv = createElementDOM(
  "input",
  ["form-control"],
  {
    type: "text",
    id: "userid",
    placeholder: "Enter github user name ",
    title: "Hint: Try with user apdrone or  defunkt etc",
  },
  ""
);

const buttonDiv = createElementDOM(
  "button",
  ["btn", "btn-primary", "mb-2"],
  { type: "submit", title: "Hint: Try with user apdrone or  defunkt etc" },
  "Search"
);

DivEl.append(labelDiv, inputDiv);

formDiv.append(DivEl, buttonDiv);

document.body.append(h1Div, formDiv);

/* Event Listener for search Btn */

btn[0].addEventListener("click", (e) => {
  e.preventDefault();
  const userBtn = document.getElementById("userid");

  fetchAPI(
    `https://api.github.com/users/${userBtn.value}/repos`,
    createRepoDom
  );
  userBtn.value = "";
  userBtn.blur();
});

const containerDiv = createElementDOM("div", ["container", "my-5"], {}, "");

const rowDiv = createElementDOM("div", ["row", "row-cols-2"], {}, "");

/* Method for creating html for user repos */

function createRepoDom(data) {
  rowDiv.innerHTML = "";
  if (data) {
    data.forEach((el) => {
      const columnDiv = createElementDOM("div", ["col", "d-flex"], {}, "");

      const cardDiv = createElementDOM(
        "div",
        ["card", "flex-fill", "mb-3", "border-success", "bg-warning"],
        { style: "max-width:540px" },
        ""
      );

      const childRowDiv = createElementDOM(
        "div",
        ["row", "no-gutters"],
        {},
        ""
      );

      const childColDiv = createElementDOM("div", ["col-md-4"], {}, "");

      const imgDiv = createElementDOM(
        "img",
        ["card-img"],
        {
          src: el.owner.avatar_url,
          alt: "user image",
        },
        ""
      );

      const colCardDiv = createElementDOM("div", ["col-md-8"], {}, "");

      const CardBodyDiv = createElementDOM("div", ["card-body"], {}, "");

      const CardTitleDiv = createElementDOM(
        "h5",
        ["card-header", "font-weight-bold", "mb-3"],
        {},
        el.name[0].toUpperCase() + el.name.slice(1)
      );

      const linkDiv = createElementDOM(
        "a",
        ["card-text"],
        { target: "_blank", role: "button", href: el.html_url },
        el.html_url
      );

      const DescriptionDiv = createElementDOM(
        "p",
        ["card-text"],
        {},
        el.description
      );

      const forkDiv = createElementDOM(
        "p",
        ["card-text"],
        {},
        `Forked ${el.forks_count} times & Starred ${el.stargazers_count} times`
      );

      CardBodyDiv.append(CardTitleDiv, DescriptionDiv, forkDiv, linkDiv);

      colCardDiv.append(CardBodyDiv);

      childColDiv.append(imgDiv);

      childRowDiv.append(childColDiv, colCardDiv);

      cardDiv.append(childRowDiv);

      columnDiv.append(cardDiv);

      rowDiv.append(columnDiv);
    });
  } else {
    alert("Please check with the user once, it seems it's incorrect!!! ");
  }

  containerDiv.append(rowDiv);

  document.body.append(containerDiv);
}
