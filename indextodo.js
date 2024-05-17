document.addEventListener("DOMContentLoaded", function() {
  const ul = document.getElementById("myUL");

  // Load existing items from local storage
  const savedItems = JSON.parse(localStorage.getItem("todoItems")) || [];

  // Add existing items to the list
  savedItems.forEach(itemText => {
      const li = createListItem(itemText);
      ul.appendChild(li);
  });

  // Add event listener for the "Add" button
  document.querySelector(".addBtn").addEventListener("click", function() {
      const inputValue = document.getElementById("myInput").value;
      if (inputValue.trim() !== "") {
          const li = createListItem(inputValue);
          ul.appendChild(li);
          saveItemsToLocalStorage();
          document.getElementById("myInput").value = "";
      } else {
          alert("You must write something!");
      }
  });

  // Event delegation for the close button
  ul.addEventListener("click", function(ev) {
      if (ev.target.classList.contains("close")) {
          const li = ev.target.parentElement;
          li.style.display = "none";
          saveItemsToLocalStorage();
      }
  });

  // Event delegation for marking items as checked
  ul.addEventListener("click", function(ev) {
      if (ev.target.tagName === "LI") {
          ev.target.classList.toggle("checked");
          saveItemsToLocalStorage();
      }
  });

  // Create a new list item
  function createListItem(text) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(text));

      const span = document.createElement("span");
      span.className = "close";
      span.appendChild(document.createTextNode("\u00D7"));
      li.appendChild(span);

      return li;
  }

  // Save items to local storage
  function saveItemsToLocalStorage() {
      const items = Array.from(ul.children)
          .filter(li => li.style.display !== "none")
          .map(li => {
              const text = li.textContent;
              return text.replace("\u00D7", "").trim(); // Remove the "x" symbol
          });
      localStorage.setItem("todoItems", JSON.stringify(items));
  }

  // Apply checked state to items loaded from local storage
  savedItems.forEach(itemText => {
      const li = ul.querySelector(`li:contains('${itemText}')`);
      if (li) {
          li.classList.add("checked");
      }
  });
});
