module.exports = {
  HTML: () => {
    return `
                <div class="create-container">
                    <input type="text" placeholder="Title" />
                    <input type="text" placeholder="Price" />
                    <input type="text" placeholder="Image Url"/>
                    <input type="text" placeholder="Purchase Link"/>
                    <Textarea placeholder="Description"></Textarea>
                    <button>submit</button>
                </div>
            `;
  }
};
