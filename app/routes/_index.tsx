import type {LinksFunction, MetaFunction} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import styles from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export async function loader({
                               request,
                             }: LoaderFunctionArgs) {
  const wpPosts = await fetch('http://localhost:8080/wp-json/wp/v2/posts');
  return json({
    posts: await wpPosts.json(),
  });
}

export default function Index() {
  const posts = useLoaderData<typeof loader>();
  return (
      <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
        {posts.posts.map((post: any) => (
                <div className="card">
                  <h6 dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
                  <div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                </div>
            )
        )}
      </div>
  )
      ;
}
