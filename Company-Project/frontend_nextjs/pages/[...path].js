import { getPage, getAllPages } from '../api/api';
import cache from '../containers';

export default function CatchAllPage({ componentName, componentProps }) {
  const Component = cache[componentName];
  if (!Component) {
    return <h1>Component {componentName} not found</h1>;
  }
  return <Component {...componentProps} />
}

export async function getStaticPaths() {
  const data = await getAllPages();

  let htmlUrls = data.items.map(x => x.relativeUrl);
  htmlUrls = htmlUrls.filter(x => x);
  htmlUrls = htmlUrls.map(x => x.split("/"));
  htmlUrls = htmlUrls.map(x => x.filter(y => y))

  const paths = htmlUrls.map(x => (
    { params: { path: x } }
  ));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview, previewData }) {
  params = params || {};
  let path = params.path || [];
  path = path.join("/");

  const pageData = await getPage(path);
  return {
    props: pageData,
  }
}
