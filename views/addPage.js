const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html`
    <h3>Add a Page</h3>
    <hr />
    <form method="POST" action="/wiki/">
      <div>
        <label for="author-name" class="col-sm-2 control-label"
          >Author Name</label
        >
        <div class="col-sm-10">
          <input
            id="author-name"
            name="authorName"
            type="text"
            class="form-control"
          />
        </div>
      </div>

      <div>
        <label for="authorEmail" class="col-sm-2 control-label"
          >Author Email</label
        >
        <div class="col-sm-10">
          <input
            id="authorEmail"
            name="authorEmail"
            type="email"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="pageTitle" class="col-sm-2 control-label">Page Title</label>
        <div class="col-sm-10">
          <input
            id="pageTitle"
            name="pageTitle"
            type="text"
            class="form-control"
          />
        </div>
      </div>

      <div>
        <label for="content" class="col-sm-2 control-label">Content</label>
        <div class="col-sm-10">
          <input
            id="content"
            name="content"
            type="textarea"
            class="form-control"
          />
        </div>
      </div>

      <div>
        <label for="status" class="col-sm-2 control-label">Status</label>
        <div class="col-sm-10">
          <select id="status" name="status">
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
  `);
