export { default } from './[...path]'

export async function getStaticProps({ params, preview, previewData }) {
  if (!preview) {
    // TODO: Serve 404 component
    return;
  }

  return {
    props: previewData,
  };
}
