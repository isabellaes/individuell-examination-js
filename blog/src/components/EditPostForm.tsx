interface Props {
  title: string;
  body: string;
  handleUpdateTitle: (title: string) => void;
  handleUpdateBody: (body: string) => void;
  handleSubmit: () => void;
}
const EditPostForm = (props: Props) => {
  return (
    <div className="edit-component">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSubmit();
        }}
      >
        <h1>Edit mode</h1>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={props.title}
          onChange={(e) => props.handleUpdateTitle(e.currentTarget.value)}
        />
        <label htmlFor="body">Body:</label>
        <input
          type="text"
          id="body"
          value={props.body}
          onChange={(e) => props.handleUpdateBody(e.currentTarget.value)}
        />
        <input type="submit" value={"save changes"}></input>
      </form>
      <a href="#">Close</a>
    </div>
  );
};

export default EditPostForm;
