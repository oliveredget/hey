import stopEventPropagation from "@hey/helpers/stopEventPropagation";
import type { AnyPost } from "@hey/indexer";
import { useRouter } from "next/router";
import type { FC } from "react";
import Commented from "./Commented";
import Reposted from "./Reposted";

interface PostTypeProps {
  post: AnyPost;
  showThread?: boolean;
  showType: boolean;
}

const PostType: FC<PostTypeProps> = ({
  post,
  showThread = false,
  showType
}) => {
  const { pathname } = useRouter();
  const type = post.__typename;

  if (!showType) {
    return null;
  }

  return (
    <span onClick={stopEventPropagation}>
      {type === "Repost" ? <Reposted account={post.author} /> : null}
      {type === "Comment" && (showThread || pathname === "/posts/[id]") ? (
        <Commented post={post} />
      ) : null}
    </span>
  );
};

export default PostType;
