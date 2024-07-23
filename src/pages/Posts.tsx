/*   2024-07-19 13:48:04

https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/posts/1
https://jsonplaceholder.typicode.com/posts/1/comments

가라로 pagination 을 만들어 보자.

*/

import Pagination from "@/components/Pagination";
import { axiosRequest } from "@/util/axiosInstance";
import axios, { CancelTokenSource } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const ITEMS_PER_PAGE = 10;

const Posts: React.FC = () => {
  const data = useLoaderData() as PostType[];
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || "1");
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = () => {
      const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
      const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
      setCurrentPosts(data?.slice(indexOfFirstPost, indexOfLastPost));
    };

    fetchPosts();
  }, [currentPage, data]);

  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  return (
    <div className="bg-indigo-50 w-full min-h-screen p-8">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">Posts</h1>
      <div className="space-y-4 mb-8">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              to={`/posts/${post.id}`}
              className="flex items-center p-4 hover:bg-indigo-50 transition-colors duration-300"
            >
              <span className="text-indigo-900 font-semibold w-12 flex-shrink-0">
                {post.id}
              </span>
              <h2 className="text-lg font-semibold text-indigo-900 hover:text-indigo-700 transition-colors duration-300 flex-grow">
                {post.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

// 추가 예외처리 예제 코드
const loader = async () => {
  const config = { method: "GET" };
  const cancelTokens: CancelTokenSource[] = [];

  try {
    const postsResult = await axiosRequest({
      endPoint: "/posts",
      config,
    });
    if (postsResult?.cancelToken) cancelTokens.push(postsResult.cancelToken);
    const postsData: PostType[] = postsResult?.data;

    console.log(postsData);
    return postsData;
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

const PostsRoute = {
  element: <Posts />,
  loader,
};

export default PostsRoute;
