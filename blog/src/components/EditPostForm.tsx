import CloseIcon from "@mui/icons-material/Close";

interface Props {
  title: string;
  body: string;
  handleUpdateTitle: (title: string) => void;
  handleUpdateBody: (body: string) => void;
  handleSubmit: () => void;
  onClose: () => void;
}
const EditPostForm = (props: Props) => {
  return (
    <div id="edit">
      <div className="edit-component">
        <h1>Edit mode</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmit();
          }}
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={props.title}
            onChange={(e) => props.handleUpdateTitle(e.currentTarget.value)}
          />
          <label htmlFor="body">Body:</label>
          <textarea
            rows={10}
            id="body"
            value={props.body}
            onChange={(e) => props.handleUpdateBody(e.currentTarget.value)}
          />
          <input
            className="button"
            type="submit"
            value={"Save changes"}
          ></input>
        </form>

        <CloseIcon onClick={() => props.onClose()}></CloseIcon>
      </div>
    </div>
  );
};

export default EditPostForm;
