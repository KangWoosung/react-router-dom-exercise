import React from "react";
import { UserType } from "./Users";
import { axiosRequest } from "@/util/axiosInstance";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { PostType } from "./Posts";
import axios, { CancelTokenSource } from "axios";

type UserLoaderDataType = {
  user: UserType;
  posts: PostType[];
};

const User: React.FC = () => {
  const { user, posts } = useLoaderData() as UserLoaderDataType;
  return (
    <div className="bg-indigo-50 min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8">
          User Details
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-indigo-900 p-4 text-white">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-indigo-800">
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">Website:</span> {user.website}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-indigo-900 p-4 text-white">
            <h2 className="text-2xl font-semibold">Address</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-indigo-800">
              <span className="font-medium">Street:</span> {user.address.street}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">Suite:</span> {user.address.suite}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">City:</span> {user.address.city}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">Zipcode:</span>{" "}
              {user.address.zipcode}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">Geo:</span> {user.address.geo.lat},{" "}
              {user.address.geo.lng}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-indigo-900 p-4 text-white">
            <h2 className="text-2xl font-semibold">Company</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-indigo-800">
              <span className="font-medium">Name:</span> {user.company.name}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">Catch Phrase:</span>{" "}
              {user.company.catchPhrase}
            </p>
            <p className="text-indigo-800">
              <span className="font-medium">BS:</span> {user.company.bs}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Posts</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-indigo-100">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-4 hover:bg-indigo-50 transition-colors duration-300"
              >
                <Link
                  to={`/posts/${post.id}`}
                  className="text-indigo-800 hover:text-indigo-600"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<UserLoaderDataType | null> => {
  const config = { method: "GET" };
  const cancelTokens: CancelTokenSource[] = [];

  try {
    const userResult = await axiosRequest({
      endPoint: `/users/${params.userId}`,
      config,
    });
    if (userResult?.cancelToken) cancelTokens.push(userResult.cancelToken);
    const userData: UserType = userResult?.data;

    const postsResult = await axiosRequest({
      endPoint: `/users/${params.userId}/posts`,
      config,
    });
    if (postsResult?.cancelToken) cancelTokens.push(postsResult.cancelToken);
    const postsData: PostType[] = postsResult?.data;

    return { user: userData, posts: postsData };
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

const UserRoute = {
  element: <User />,
  loader,
};

export default UserRoute;