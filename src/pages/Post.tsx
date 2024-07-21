/*   2024-07-19 14:55:22

  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },

    {
    "postId": 50,
    "id": 246,
    "name": "magnam earum qui eaque sunt excepturi",
    "email": "Jaycee.Turner@euna.name",
    "body": "quia est sed eos animi optio dolorum\nconsequatur reiciendis exercitationem ipsum nihil omnis\nbeatae sed corporis enim quisquam\net blanditiis qui nihil"
  },
  
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },

*/

import { axiosRequest } from "@/util/axiosInstance";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import { PostType } from "./Posts";
import { UserType } from "@/context/AuthProvider";
import axios, { CancelTokenSource } from "axios";

type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostLoaderDataType = {
  post: PostType;
  comments: CommentType[];
  user: UserType;
};

// type PostLoaderDataTypeAndNull = PostLoaderDataType | null;

const Post = () => {
  const { post, comments, user } = useLoaderData() as PostLoaderDataType;
  const { postId } = useParams();
  console.log("Component postId:", postId);
  return (
    <div className="bg-indigo-50 w-full min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-4">Post</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-indigo-900 p-4 text-white">
            <h2 className="text-2xl font-semibold">PostId: {post.id}</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="text-indigo-800">
              <span className="font-medium">Author:</span> {user.name}
            </div>
            <div className="text-indigo-800">
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div className="text-xl font-semibold text-indigo-900">
              {post.title}
            </div>
            <p className="text-gray-700">{post.body}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Comments</h2>
        <div className="space-y-6">
          {comments.map((comment: CommentType) => (
            <div key={comment.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                {comment.name}
              </h3>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// axiosRequest 에서 에러 처리가 되고 있으므로, loader 에서의 에러 처리는 굳이 필요 없다.
// AbortController 역시 axiosRequest 에서 처리되고 있으므로, loader 에서의 처리는 필요 없다.
const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<PostLoaderDataType | null> => {
  //   console.log(params.postId);
  const config = { method: "GET" };
  const cancelTokens: CancelTokenSource[] = [];

  try {
    const postResult = await axiosRequest({
      endPoint: "/posts/" + params.postId,
      config,
    });
    if (postResult?.cancelToken) cancelTokens.push(postResult.cancelToken);
    const postData: PostType = postResult?.data;

    const commentResult = await axiosRequest({
      endPoint: `/posts/${params.postId}/comments`,
      config,
    });
    if (commentResult?.cancelToken)
      cancelTokens.push(commentResult.cancelToken);
    const commentData: CommentType[] = commentResult?.data;

    const userResult = await axiosRequest({
      endPoint: `/users/${postData.userId}`,
      config,
    });
    if (userResult?.cancelToken) cancelTokens.push(userResult.cancelToken);
    const userData: UserType = userResult?.data;

    return { post: postData, comments: commentData, user: userData };
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
      return null;
    }
    throw e;
  } finally {
    // 모든 요청 취소 (이미 완료된 요청에는 영향 없음)
    cancelTokens.forEach((cancelToken) => {
      cancelToken.cancel("Request canceled by cleanup");
    });
  }
};

const PostRoute = {
  element: <Post />,
  loader,
};

export default PostRoute;
