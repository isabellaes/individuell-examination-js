import CloseIcon from "@mui/icons-material/Close";

interface Props {
  onClose: () => void;
  handleSubmitCreateForm: () => void;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
}
const CreatePost = (props: Props) => {
  return (
    <div id="create">
      <div className="create-component">
        <CloseIcon onClick={() => props.onClose()}></CloseIcon>
        <h1>Create Post</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmitCreateForm();
          }}
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            required
            id="title"
            onChange={(e) => props.setTitle(e.currentTarget.value)}
          />
          <label htmlFor="body">Body:</label>
          <textarea
            rows={10}
            id="body"
            required
            onChange={(e) => props.setBody(e.currentTarget.value)}
          />
          <input className="button" type="submit" value={"Create"}></input>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
