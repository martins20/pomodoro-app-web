// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
jest.mock("react-icons/cg", () => ({
  CgTrashEmpty: (props: any) => <h1 {...props}>trash</h1>,
}))
